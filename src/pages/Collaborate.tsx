import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, MessageSquare, BookOpen, Zap, Crown, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  {
    id: 1,
    name: "Bio 201 Study Group",
    subject: "Biology",
    subjectColor: "bg-green-100 text-green-700",
    members: 5,
    avatars: ["JD", "AK", "ML", "RS", "TN"],
    lastActivity: "2 hours ago",
    notes: 18,
    flashcards: 94,
    messages: 32,
    isAdmin: true,
  },
  {
    id: 2,
    name: "CS Algorithms Team",
    subject: "Computer Science",
    subjectColor: "bg-purple-100 text-purple-700",
    members: 4,
    avatars: ["JD", "BW", "CL", "ZP"],
    lastActivity: "Yesterday",
    notes: 12,
    flashcards: 67,
    messages: 89,
    isAdmin: false,
  },
  {
    id: 3,
    name: "Econ Study Circle",
    subject: "Economics",
    subjectColor: "bg-amber-100 text-amber-700",
    members: 7,
    avatars: ["JD", "NF", "LK", "AM", "RG", "PH", "YC"],
    lastActivity: "3 days ago",
    notes: 9,
    flashcards: 45,
    messages: 14,
    isAdmin: false,
  },
];

const sharedNotes = [
  { title: "Cell Division & Mitosis", author: "Alex K.", date: "Mar 7", subject: "Biology", subjectColor: "bg-green-100 text-green-700" },
  { title: "Graph Algorithms — BFS & DFS", author: "Beth W.", date: "Mar 6", subject: "Computer Science", subjectColor: "bg-purple-100 text-purple-700" },
  { title: "Market Structures & Monopoly", author: "Carlos L.", date: "Mar 5", subject: "Economics", subjectColor: "bg-amber-100 text-amber-700" },
  { title: "Photosynthesis Overview", author: "You", date: "Mar 4", subject: "Biology", subjectColor: "bg-green-100 text-green-700" },
];

const messages = [
  { author: "Alex K.", avatar: "AK", text: "I just uploaded the summary for Chapter 12 — check the shared notes!", time: "2h ago", group: "Bio 201" },
  { author: "Beth W.", avatar: "BW", text: "The BFS flashcard deck is ready. Who wants to do a quiz session tonight?", time: "Yesterday", group: "CS Algorithms" },
  { author: "You", avatar: "JD", text: "Shared the Econ midterm notes. Let me know if you have questions!", time: "3d ago", group: "Econ Circle" },
];

type Tab = "groups" | "notes" | "messages";

export default function Collaborate() {
  const [activeTab, setActiveTab] = useState<Tab>("groups");
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", subject: "" });

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "groups", label: "Study Groups", icon: Users },
    { id: "notes", label: "Shared Notes", icon: BookOpen },
    { id: "messages", label: "Discussions", icon: MessageSquare },
  ];

  return (
    <Layout>
      <div className="px-6 py-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Collaborative Spaces</h1>
            <p className="text-muted-foreground text-sm mt-1">Study together, share notes, and quiz each other.</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold shadow-study hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Group
          </button>
        </div>

        {/* Create group modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm px-4">
            <div className="study-card p-6 w-full max-w-md animate-fade-in">
              <h2 className="font-display font-bold text-foreground mb-4">Create Study Group</h2>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Group Name</label>
                  <input
                    value={newGroup.name}
                    onChange={(e) => setNewGroup((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Bio 201 Study Group"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Subject</label>
                  <input
                    value={newGroup.subject}
                    onChange={(e) => setNewGroup((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="e.g. Biology"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-study">
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeTab === id
                  ? "bg-primary text-primary-foreground shadow-study"
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Groups */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="study-card p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${group.subjectColor}`}>{group.subject}</span>
                      {group.isAdmin && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Crown className="w-3 h-3" /> Admin
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm">{group.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{group.members} members · {group.lastActivity}</p>
                  </div>
                </div>

                {/* Member avatars */}
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {group.avatars.slice(0, 4).map((av, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-card"
                      >
                        {av}
                      </div>
                    ))}
                    {group.members > 4 && (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border-2 border-card">
                        +{group.members - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-primary" /> {group.notes} notes</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-accent" /> {group.flashcards} cards</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {group.messages} messages</span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                  Open Workspace <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Join group CTA */}
            <div className="study-card p-5 border-dashed flex flex-col items-center justify-center text-center gap-3 min-h-[200px]">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Join a Group</p>
                <p className="text-xs text-muted-foreground mt-1">Enter an invite code to join a classmate's study space.</p>
              </div>
              <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                Enter Invite Code
              </button>
            </div>
          </div>
        )}

        {/* Shared Notes */}
        {activeTab === "notes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sharedNotes.map((note) => (
              <Link key={note.title} to="/results" className="study-card-hover p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${note.subjectColor}`}>{note.subject}</span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {note.author === "You" ? "JD" : note.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-muted-foreground">Shared by {note.author}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div className="study-card divide-y divide-border">
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-4 p-5 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{msg.author}</p>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{msg.group}</span>
                    <span className="text-xs text-muted-foreground ml-auto shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div className="p-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">JD</div>
                <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
                  <input placeholder="Write a message..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  <button className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
