import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image data provided');
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const prompt = `Analyze the facial expression in this image and return ONLY a valid JSON object with these exact fields:

{
  "age": <estimated age as number or null>,
  "emotion": "<one of: happy, neutral, sad, angry, fear, surprise, disgust>",
  "confidence": <confidence level 0-100>,
  "isSmiling": <true or false>,
  "isEmergency": <true or false>,
  "noFace": <true if no face detected, false otherwise>
}

Important: 
- Return ONLY the JSON object, no other text
- The emotion should be the most prominent emotion visible
- Confidence should reflect how certain you are about the emotion (0-100)
- If the person appears happy or smiling, set emotion to "happy" and isSmiling to true
- Only set noFace to true if no human face is visible in the image

Example response:
{"age": 30, "emotion": "happy", "confidence": 90, "isSmiling": true, "isEmergency": false, "noFace": false}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.4,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 401 || response.status === 403) {
        return new Response(JSON.stringify({ 
          error: "Invalid or missing Gemini API key. Please check GEMINI_API_KEY in Supabase Edge Function secrets.",
          details: errorText 
        }), {
          status: 400, // Return 400 instead of 401 to avoid confusion with Supabase auth
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Log the response for debugging (remove in production if needed)
    console.log("Gemini API response:", JSON.stringify(data, null, 2));
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      throw new Error(`Gemini API error: ${data.error.message || JSON.stringify(data.error)}`);
    }
    
    // Handle Gemini API response format
    const candidates = data.candidates || [];
    if (candidates.length === 0) {
      console.error("No candidates in Gemini response");
      throw new Error("No response from Gemini API");
    }
    
    const candidate = candidates[0];
    const content = candidate.content?.parts?.[0]?.text || "";
    
    if (!content) {
      console.error("Empty content in Gemini response", candidate);
      throw new Error("Empty response from Gemini API");
    }
    
    console.log("Gemini response content:", content);
    
    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Try to parse as JSON directly first
      try {
        analysisResult = JSON.parse(content.trim());
      } catch (directParseError) {
        // If direct parse fails, try to extract JSON from text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      }
      
      // Validate the result has required fields
      if (!analysisResult.emotion) {
        throw new Error("Invalid response format: missing emotion");
      }
      
      console.log("Parsed analysis result:", analysisResult);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      console.error("Parse error:", parseError);
      // Return default result with error indication
      analysisResult = {
        age: null,
        emotion: "neutral",
        confidence: 0,
        isSmiling: false,
        isEmergency: false,
        noFace: true,
        error: `Failed to parse response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("analyze-emotion error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
