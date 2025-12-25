import { Background3D } from '@/components/Background3D';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowLeft, TrendingUp, Users, Smile, Activity } from 'lucide-react';

const sentimentData = [
    { time: '09:00', score: 65 },
    { time: '10:00', score: 75 },
    { time: '11:00', score: 85 },
    { time: '12:00', score: 80 },
    { time: '13:00', score: 90 },
    { time: '14:00', score: 85 },
    { time: '15:00', score: 95 },
];

const emotionData = [
    { name: 'Happy', value: 45, fill: '#22c55e' }, // green-500
    { name: 'Neutral', value: 25, fill: '#94a3b8' }, // slate-400
    { name: 'Surprised', value: 15, fill: '#eab308' }, // yellow-500
    { name: 'Sad', value: 10, fill: '#3b82f6' }, // blue-500
    { name: 'Angry', value: 5, fill: '#ef4444' }, // red-500
];

const sessionsData = [
    { day: 'Mon', sessions: 120 },
    { day: 'Tue', sessions: 150 },
    { day: 'Wed', sessions: 180 },
    { day: 'Thu', sessions: 140 },
    { day: 'Fri', sessions: 200 },
    { day: 'Sat', sessions: 160 },
    { day: 'Sun', sessions: 130 },
];

export default function Analytics() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative p-8 overflow-y-auto">
            {/* 3D Background with overlay for readability */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Background3D />
                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Analytics Dashboard</h1>
                        <p className="text-white/70 mt-2">Real-time insights on emotion detection sessions</p>
                    </div>
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Sessions"
                        value="1,234"
                        trend="+12%"
                        icon={Users}
                        trendUp={true}
                    />
                    <StatCard
                        title="Avg Happiness"
                        value="8.5/10"
                        trend="+5%"
                        icon={Smile}
                        trendUp={true}
                    />
                    <StatCard
                        title="Emotions Logged"
                        value="45.2k"
                        trend="+8%"
                        icon={Activity}
                        trendUp={true}
                    />
                    <StatCard
                        title="Engagement Rate"
                        value="92%"
                        trend="-2%"
                        icon={TrendingUp}
                        trendUp={false}
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-black/50 backdrop-blur-xl border-white/10 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Happiness Trend (Today)</CardTitle>
                            <CardDescription className="text-white/50">Hourly sentiment analysis score</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sentimentData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#a855f7" fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/50 backdrop-blur-xl border-white/10 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Weekly Sessions</CardTitle>
                            <CardDescription className="text-white/50">Number of detection sessions per day</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sessionsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-1 bg-black/50 backdrop-blur-xl border-white/10 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Emotion Distribution</CardTitle>
                            <CardDescription className="text-white/50">Breakdown of detected emotions</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={emotionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {emotionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend wrapperStyle={{ color: 'white' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 bg-black/50 backdrop-blur-xl border-white/10 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Recent Alerts</CardTitle>
                            <CardDescription className="text-white/50">Emergency and stress alerts triggered recently</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                            <div>
                                                <p className="font-medium text-white">High Stress Level Detected</p>
                                                <p className="text-sm text-white/50">Session #{2340 + i} • 2 mins ago</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">View</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Helper Component for Stats
function StatCard({ title, value, trend, icon: Icon, trendUp }: any) {
    return (
        <Card className="bg-black/50 backdrop-blur-xl border-white/10 text-white shadow-xl overflow-hidden relative group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
                <Icon className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs mt-1 ${trendUp ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                    {trend}
                    <span className="text-white/40">from last month</span>
                </p>
            </CardContent>
        </Card>
    );
}
