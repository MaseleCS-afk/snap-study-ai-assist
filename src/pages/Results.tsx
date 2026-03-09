import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Download, Share2, Zap, ChevronDown, ChevronUp,
  CheckCircle, Bot, BookMarked, RotateCcw, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const summary = {
  subject: "Biology",
  subjectColor: "bg-green-100 text-green-700",
  title: "Cell Division & Mitosis",
  overview: "Mitosis is the process by which a eukaryotic cell separates its duplicated chromosomes into two identical daughter cells. It is a fundamental process for growth, repair, and asexual reproduction in multicellular organisms. The process occurs in four main phases: Prophase, Metaphase, Anaphase, and Telophase (PMAT).",
  keyPoints: [
    "Mitosis produces two genetically identical daughter cells with the same number of chromosomes as the parent cell.",
    "The cell cycle consists of Interphase (G1, S, G2 phases) and the Mitotic phase.",
    "Spindle fibers form during Prophase and attach to chromosomes at the centromere.",
    "During Metaphase, chromosomes align at the cell's equator (metaphase plate).",
    "Sister chromatids are pulled apart to opposite poles during Anaphase.",
    "Cytokinesis completes cell division, splitting the cytoplasm into two new cells.",
  ],
  definitions: [
    { term: "Centromere", def: "The region of a chromosome where sister chromatids are joined and where spindle fibers attach during cell division." },
    { term: "Cytokinesis", def: "The physical process of cell division that divides the cytoplasm of a cell following mitosis or meiosis." },
    { term: "Chromatid", def: "One of two identical copies of a chromosome produced by chromosome replication, joined at the centromere." },
    { term: "Spindle Fiber", def: "Protein structures formed during cell division that help separate the chromosomes during mitosis and meiosis." },
    { term: "Interphase", def: "The phase of the cell cycle in which the cell grows, replicates its DNA, and prepares for cell division." },
  ],
  flashcards: [
    { q: "What are the four phases of mitosis?", a: "Prophase, Metaphase, Anaphase, and Telophase (PMAT)" },
    { q: "How many daughter cells does mitosis produce?", a: "Two genetically identical daughter cells" },
    { q: "What happens during Anaphase?", a: "Sister chromatids are pulled apart to opposite poles of the cell by spindle fibers." },
    { q: "What is the purpose of mitosis?", a: "Growth, repair of damaged tissues, and asexual reproduction in organisms." },
    { q: "What is the metaphase plate?", a: "The equatorial plane of the cell where chromosomes align during Metaphase." },
    { q: "Define cytokinesis.", a: "The process that physically divides the cytoplasm after nuclear division is complete." },
  ],
};

export default function Results() {
  const [showAllCards, setShowAllCards] = useState(false);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);

  const visibleCards = showAllCards ? summary.flashcards : summary.flashcards.slice(0, 3);

  return (
    <Layout>
      <div className="px-6 py-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${summary.subjectColor}`}>{summary.subject}</span>
            <h1 className="font-display text-2xl font-bold text-foreground mt-2">{summary.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                saved
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <BookMarked className="w-4 h-4" />
              {saved ? "Saved!" : "Save"}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Summary */}
            <div className="study-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-display font-bold text-foreground">AI Summary</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{summary.overview}</p>
            </div>

            {/* Key Points */}
            <div className="study-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <h2 className="font-display font-bold text-foreground">Key Points</h2>
              </div>
              <ul className="space-y-2.5">
                {summary.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Definitions */}
            <div className="study-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-500" />
                </div>
                <h2 className="font-display font-bold text-foreground">Key Definitions</h2>
              </div>
              <div className="space-y-3">
                {summary.definitions.map(({ term, def }) => (
                  <div key={term} className="rounded-xl bg-muted/50 p-3.5">
                    <p className="text-xs font-bold text-primary mb-1">{term}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flashcards sidebar */}
          <div className="space-y-4">
            <div className="study-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-display font-bold text-foreground text-sm">Flashcards</h2>
                <span className="ml-auto text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {summary.flashcards.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {visibleCards.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
                    className="w-full text-left rounded-xl border border-border p-3.5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-foreground leading-relaxed">
                        {flipped[i] ? (
                          <span className="text-accent">{card.a}</span>
                        ) : (
                          card.q
                        )}
                      </p>
                      <RotateCcw className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {flipped[i] ? "Answer" : "Tap to reveal"}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAllCards(!showAllCards)}
                className="w-full mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                {showAllCards ? (
                  <><ChevronUp className="w-3 h-3" /> Show less</>
                ) : (
                  <><ChevronDown className="w-3 h-3" /> View all {summary.flashcards.length} cards</>
                )}
              </button>
            </div>

            {/* Ask AI Copilot */}
            <Link to="/copilot" className="study-card-hover p-5 block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-study">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Ask AI Copilot</p>
                  <p className="text-xs text-muted-foreground">Get explanations &amp; examples</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
