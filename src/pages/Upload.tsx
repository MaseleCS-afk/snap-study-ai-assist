import Layout from "@/components/Layout";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload as UploadIcon, FileText, ClipboardPaste, ImagePlus, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "photo" | "image" | "pdf" | "text";

export default function Upload() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("image");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const tabs: { id: Mode; icon: React.ElementType; label: string }[] = [
    { id: "image", icon: ImagePlus, label: "Upload Image" },
    { id: "pdf", icon: FileText, label: "Upload PDF" },
    { id: "text", icon: ClipboardPaste, label: "Paste Text" },
    { id: "photo", icon: Camera, label: "Camera" },
  ];

  const handleFile = (f: File) => {
    setFile(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = () => {
    if ((mode === "text" && !text.trim()) || (mode !== "text" && !file)) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate("/results");
    }, 2800);
  };

  const canAnalyze = (mode === "text" && text.trim().length > 10) || (mode !== "text" && file !== null);

  if (processing) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
          <div className="study-card p-12 text-center max-w-sm w-full animate-fade-in">
            <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-study">
              <Sparkles className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <p className="font-semibold text-foreground">Analyzing your study material...</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Our AI is extracting key concepts, generating summaries, and creating flashcards for you.
            </p>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="h-full gradient-primary rounded-full animate-[grow_2.8s_ease-in-out_forwards]" style={{ width: "75%", transition: "width 2.8s ease-in-out" }} />
            </div>
            <div className="mt-4 space-y-1.5 text-left">
              {["✅ Text extracted from content", "✅ Key concepts identified", "⏳ Generating flashcards..."].map((step) => (
                <p key={step} className="text-xs text-muted-foreground">{step}</p>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 py-8 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Snap &amp; Summarize</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload your study material and let AI do the heavy lifting.</p>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { setMode(id); setFile(null); setPreview(null); setText(""); }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                mode === id
                  ? "bg-primary text-primary-foreground shadow-study"
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Upload area */}
        <div className="study-card p-6">
          {mode === "text" ? (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Paste your notes or text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste lecture notes, textbook content, or any study material here..."
                rows={10}
                className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              />
              <p className="text-xs text-muted-foreground mt-2">{text.length} characters</p>
            </div>
          ) : mode === "photo" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Use your camera</h3>
              <p className="text-sm text-muted-foreground mb-6">Take a photo of your textbook page, handwritten notes, or whiteboard.</p>
              <button
                onClick={() => { setMode("image"); if (fileRef.current) { fileRef.current.accept = "image/*"; fileRef.current.capture = "environment"; fileRef.current.click(); } }}
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-study hover:opacity-90 transition-opacity"
              >
                <Camera className="w-4 h-4" /> Open Camera
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200",
                dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40"
              )}
            >
              {preview ? (
                <div className="relative inline-block">
                  <img src={preview} alt="Preview" className="max-h-64 rounded-xl mx-auto shadow-card" />
                  <button
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-10 h-10 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="ml-2 text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">
                    {mode === "pdf" ? "Drop your PDF here" : "Drop your image here"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Browse Files
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">
                    {mode === "pdf" ? "PDF files up to 20MB" : "JPG, PNG, WEBP up to 20MB"}
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept={mode === "pdf" ? "application/pdf" : "image/*"}
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all duration-200",
            canAnalyze
              ? "gradient-primary text-primary-foreground shadow-study hover:shadow-study-hover hover:opacity-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Sparkles className="w-5 h-5" />
          Analyze with AI
        </button>
      </div>
    </Layout>
  );
}
