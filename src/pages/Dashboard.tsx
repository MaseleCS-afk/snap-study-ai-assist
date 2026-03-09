import Layout from "@/components/Layout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Clock, BookOpen, Zap, Target, AlertCircle, CheckCircle, Calendar } from "lucide-react";

const weeklyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 80 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 110 },
  { day: "Fri", minutes: 60 },
  { day: "Sat", minutes: 95 },
  { day: "Sun", minutes: 50 },
];

const topicData = [
  { name: "Biology", value: 85, fill: "hsl(243 75% 59%)" },
  { name: "Chemistry", value: 62, fill: "hsl(158 64% 52%)" },
  { name: "CS", value: 91, fill: "hsl(38 92% 50%)" },
  { name: "Economics", value: 48, fill: "hsl(0 84% 60%)" },
  { name: "Physics", value: 73, fill: "hsl(258 70% 65%)" },
];

const pieData = [
  { name: "Mastered", value: 18, color: "hsl(158 64% 52%)" },
  { name: "Learning", value: 11, color: "hsl(243 75% 59%)" },
  { name: "Needs Review", value: 7, color: "hsl(38 92% 50%)" },
];

const stats = [
  { icon: Clock, label: "Study Hours This Week", value: "7.8h", change: "+12%", positive: true, color: "text-primary bg-primary/10" },
  { icon: BookOpen, label: "Notes Summarized", value: "48", change: "+5 this week", positive: true, color: "text-accent bg-accent/10" },
  { icon: Zap, label: "Flashcards Reviewed", value: "312", change: "+48 today", positive: true, color: "text-orange-500 bg-orange-50" },
  { icon: Target, label: "Avg. Accuracy", value: "74%", change: "+3% vs last week", positive: true, color: "text-sky-500 bg-sky-50" },
];

const weakTopics = [
  { topic: "Supply & Demand Equilibrium", subject: "Economics", score: 48 },
  { topic: "Organic Reaction Mechanisms", subject: "Chemistry", score: 62 },
  { topic: "Newton's Laws of Motion", subject: "Physics", score: 67 },
];

const schedule = [
  { day: "Today", topic: "Review Cell Division Flashcards", subject: "Biology", duration: "20 min" },
  { day: "Tomorrow", topic: "Practice Economics Problems", subject: "Economics", duration: "35 min" },
  { day: "Wed", topic: "Chemistry Reaction Mechanisms", subject: "Chemistry", duration: "30 min" },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="px-6 py-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Smart Study Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Your personalized study analytics and recommendations.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, change, positive, color }) => (
            <div key={label} className="study-card p-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">{label}</p>
              <p className={`text-xs font-medium flex items-center gap-1 ${positive ? "text-accent" : "text-destructive"}`}>
                <TrendingUp className="w-3 h-3" /> {change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Study Time */}
          <div className="lg:col-span-2 study-card p-6">
            <h2 className="font-display font-bold text-foreground mb-1">Weekly Study Time</h2>
            <p className="text-xs text-muted-foreground mb-5">Minutes studied per day this week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(v: number) => [`${v} min`, "Study time"]}
                />
                <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic mastery pie */}
          <div className="study-card p-6">
            <h2 className="font-display font-bold text-foreground mb-1">Topic Mastery</h2>
            <p className="text-xs text-muted-foreground mb-4">36 topics total</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {pieData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-muted-foreground">{name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject scores */}
          <div className="study-card p-6">
            <h2 className="font-display font-bold text-foreground mb-1">Subject Scores</h2>
            <p className="text-xs text-muted-foreground mb-5">Mastery percentage by subject</p>
            <div className="space-y-3">
              {topicData.map(({ name, value, fill }) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{name}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, background: fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Weak topics */}
            <div className="study-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <h2 className="font-display font-bold text-foreground text-sm">Needs Review</h2>
              </div>
              <div className="space-y-2.5">
                {weakTopics.map(({ topic, subject, score }) => (
                  <div key={topic} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-foreground leading-snug">{topic}</p>
                      <p className="text-xs text-muted-foreground">{subject}</p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-600">{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested schedule */}
            <div className="study-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <h2 className="font-display font-bold text-foreground text-sm">Recommended Schedule</h2>
              </div>
              <div className="space-y-2.5">
                {schedule.map(({ day, topic, subject, duration }) => (
                  <div key={topic} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{day}</p>
                      <p className="text-xs text-muted-foreground truncate">{topic}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
