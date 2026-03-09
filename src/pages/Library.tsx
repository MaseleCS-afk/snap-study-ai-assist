import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, FolderOpen, Zap, Clock, BookOpen, Filter } from "lucide-react";

const folders = [
  { name: "Biology", color: "bg-green-100 text-green-700", count: 12, icon: "🧬" },
  { name: "Chemistry", color: "bg-blue-100 text-blue-700", count: 8, icon: "⚗️" },
  { name: "Computer Science", color: "bg-purple-100 text-purple-700", count: 15, icon: "💻" },
  { name: "Economics", color: "bg-amber-100 text-amber-700", count: 6, icon: "📊" },
  { name: "Physics", color: "bg-red-100 text-red-700", count: 9, icon: "⚡" },
  { name: "Mathematics", color: "bg-teal-100 text-teal-700", count: 11, icon: "📐" },
];

const notes = [
  { id: 1, subject: "Biology", subjectColor: "bg-green-100 text-green-700", title: "Cell Division & Mitosis", date: "Mar 7, 2026", cards: 12, time: "45 min study" },
  { id: 2, subject: "Chemistry", subjectColor: "bg-blue-100 text-blue-700", title: "Organic Reaction Mechanisms", date: "Mar 6, 2026", cards: 8, time: "30 min study" },
  { id: 3, subject: "Computer Science", subjectColor: "bg-purple-100 text-purple-700", title: "Graph Algorithms — BFS & DFS", date: "Mar 5, 2026", cards: 15, time: "60 min study" },
  { id: 4, subject: "Economics", subjectColor: "bg-amber-100 text-amber-700", title: "Supply & Demand Equilibrium", date: "Mar 4, 2026", cards: 10, time: "40 min study" },
  { id: 5, subject: "Biology", subjectColor: "bg-green-100 text-green-700", title: "Photosynthesis & Cellular Respiration", date: "Mar 3, 2026", cards: 14, time: "55 min study" },
  { id: 6, subject: "Physics", subjectColor: "bg-red-100 text-red-700", title: "Newton's Laws of Motion", date: "Mar 2, 2026", cards: 9, time: "35 min study" },
  { id: 7, subject: "Mathematics", subjectColor: "bg-teal-100 text-teal-700", title: "Calculus: Derivatives & Integrals", date: "Mar 1, 2026", cards: 18, time: "70 min study" },
  { id: 8, subject: "Computer Science", subjectColor: "bg-purple-100 text-purple-700", title: "Dynamic Programming Fundamentals", date: "Feb 28, 2026", cards: 11, time: "50 min study" },
];

export default function Library() {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const filtered = notes.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase());
    const matchFolder = !activeFolder || n.subject === activeFolder;
    return matchSearch && matchFolder;
  });

  return (
    <Layout>
      <div className="px-6 py-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Study Library</h1>
            <p className="text-muted-foreground text-sm mt-1">All your summaries, organized by subject.</p>
          </div>
          <Link
            to="/upload"
            className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold shadow-study hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Summary
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes, subjects, topics..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-card transition-shadow"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted transition-colors">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>

        {/* Folders */}
        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-3">Subjects</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveFolder(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                !activeFolder
                  ? "bg-primary text-primary-foreground border-primary shadow-study"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <BookOpen className="w-4 h-4" /> All Notes
            </button>
            {folders.map(({ name, color, count, icon }) => (
              <button
                key={name}
                onClick={() => setActiveFolder(activeFolder === name ? null : name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  activeFolder === name
                    ? "bg-primary text-primary-foreground border-primary shadow-study"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <span>{icon}</span>
                {name}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeFolder === name ? "bg-white/20" : color}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Notes grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base font-bold text-foreground">
              {activeFolder ? `${activeFolder} Notes` : "All Notes"}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="study-card p-12 text-center">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground">No notes found</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different search or add a new summary.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((note) => (
                <Link key={note.id} to="/results" className="study-card-hover p-5 group">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${note.subjectColor}`}>{note.subject}</span>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-3 leading-snug group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" /> {note.cards} cards</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {note.time}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
