import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Camera, Upload, FileText, ClipboardPaste, ArrowRight, BookOpen, Clock, Zap, TrendingUp, Star } from "lucide-react";

const quickActions = [
  {
    icon: Camera,
    title: "Snap a Page",
    description: "Take a photo of your textbook or notes",
    to: "/upload",
    gradient: "from-primary to-purple-600",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Upload,
    title: "Upload Screenshot",
    description: "Upload lecture slide screenshots",
    to: "/upload",
    gradient: "from-accent to-teal-500",
    bg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: FileText,
    title: "Upload PDF",
    description: "Analyze research papers & PDFs",
    to: "/upload",
    gradient: "from-orange-400 to-rose-400",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: ClipboardPaste,
    title: "Paste Text",
    description: "Paste notes or copied content",
    to: "/upload",
    gradient: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
];

const recentSummaries = [
  {
    subject: "Biology",
    color: "bg-green-100 text-green-700",
    title: "Cell Division & Mitosis",
    time: "2 hours ago",
    cards: 12,
  },
  {
    subject: "Chemistry",
    color: "bg-blue-100 text-blue-700",
    title: "Organic Reaction Mechanisms",
    time: "Yesterday",
    cards: 8,
  },
  {
    subject: "Computer Science",
    color: "bg-purple-100 text-purple-700",
    title: "Graph Algorithms — BFS & DFS",
    time: "2 days ago",
    cards: 15,
  },
  {
    subject: "Economics",
    color: "bg-amber-100 text-amber-700",
    title: "Supply & Demand Equilibrium",
    time: "3 days ago",
    cards: 10,
  },
];

const stats = [
  { icon: BookOpen, label: "Notes Summarized", value: "48", color: "text-primary bg-primary/10" },
  { icon: Clock, label: "Study Hours", value: "32h", color: "text-accent bg-accent/10" },
  { icon: Zap, label: "Flashcards", value: "312", color: "text-orange-500 bg-orange-50" },
  { icon: TrendingUp, label: "Topics Mastered", value: "18", color: "text-sky-500 bg-sky-50" },
];

export default function Index() {
  return (
    <Layout>
      <div className="px-6 py-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-primary-foreground">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-16 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="text-sm font-medium text-white/80">Your AI Study Assistant</span>
            </div>
            <h1 className="font-display text-3xl font-bold mb-2 leading-tight">
              Study smarter,<br />not harder.
            </h1>
            <p className="text-white/75 text-sm mb-5">
              Turn any study material — photos, PDFs, slides — into clear summaries, flashcards, and exam notes in seconds.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors shadow-study"
            >
              Start Studying <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="study-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground font-display">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ icon: Icon, title, description, to, bg, iconColor }) => (
              <Link key={title} to={to} className="study-card-hover p-5 group">
                <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Summaries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">Recent Summaries</h2>
            <Link to="/library" className="text-sm text-primary font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentSummaries.map(({ subject, color, title, time, cards }) => (
              <Link key={title} to="/results" className="study-card-hover p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{subject}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3 text-primary" />
                  {cards} flashcards generated
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
