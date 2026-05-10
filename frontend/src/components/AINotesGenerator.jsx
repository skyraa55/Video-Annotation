import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://localhost:3000/api";

const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ── Icons ──────────────────────────────────────────────────────────────────────
const Icon = {
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

// ── Upload Zone ────────────────────────────────────────────────────────────────
function UploadZone({ file, onFileSelect, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileSelect(dropped);
  }, [onFileSelect]);

  if (file) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-200 rounded-xl"
      >
        <div className="flex-shrink-0 w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
          <Icon.Video />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)}</p>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all"
        >
          <Icon.Close />
        </button>
      </motion.div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
        ${dragging
          ? "border-orange-400 bg-orange-50"
          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/x-matroska,video/quicktime,video/x-msvideo,video/webm"
        className="hidden"
        onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0])}
      />
      <div className="flex flex-col items-center gap-3">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
          ${dragging ? "bg-orange-100 text-orange-500" : "bg-gray-100 text-gray-400"}`}>
          <Icon.Upload />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Drop your video here or{" "}
            <span className="text-orange-500">browse files</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">MP4, MKV, MOV, AVI, WebM · Max 500 MB</p>
        </div>
      </div>
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ stage }) {
  const stages = [
    { key: "uploading",    label: "Uploading video",               emoji: "⬆️" },
    { key: "transcribing", label: "Transcribing audio (Whisper AI)", emoji: "🎙️" },
    { key: "generating",   label: "Generating notes (GPT-4)",       emoji: "✨" },
    { key: "saving",       label: "Saving to database",             emoji: "💾" },
  ];
  const currentIdx = stages.findIndex((s) => s.key === stage);

  return (
    <div className="space-y-3">
      {stages.map((s, i) => {
        const done   = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s.key} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-300
              ${done   ? "bg-green-100 text-green-600 border border-green-200"
              : active ? "bg-orange-500 text-white"
              :          "bg-gray-100 text-gray-400 border border-gray-200"}`}
            >
              {done ? <Icon.Check /> : <span>{s.emoji}</span>}
            </div>
            <span className={`text-sm transition-colors flex-1
              ${done   ? "text-green-600 font-medium"
              : active ? "text-gray-900 font-semibold"
              :          "text-gray-400"}`}>
              {s.label}
            </span>
            {active && (
              <div className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <div key={d}
                    className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Notes Display ──────────────────────────────────────────────────────────────
function NotesDisplay({ notes, videoTitle, prompt, onClose, onSaveNew }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "overview",  label: "Overview" },
    { id: "detailed",  label: "Detailed Notes" },
    { id: "actions",   label: "Action Items" },
  ];

  const handleCopy = () => {
    const text = [
      `# ${notes.title}`,
      `\n## Summary\n${notes.summary}`,
      `\n## Key Points\n${notes.keyPoints.map((p) => `- ${p}`).join("\n")}`,
      `\n## Detailed Notes\n${notes.detailedNotes.map((n) => `### ${n.heading}\n${n.content}`).join("\n\n")}`,
      `\n## Action Items\n${notes.actionItems.map((a) => `- ${a}`).join("\n")}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                <Icon.Check /> Notes Generated
              </span>
              {notes.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-gray-900 truncate">{notes.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              <span className="text-gray-500 font-medium">Video:</span> {videoTitle}
              &nbsp;·&nbsp;
              <span className="text-gray-500 font-medium">Prompt:</span> {prompt}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-2 bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-600 text-gray-500 rounded-xl transition-all font-medium"
            >
              <Icon.Copy />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200"
            >
              <Icon.Close />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-6 pt-5 border-b border-gray-100 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm rounded-t-xl transition-all font-medium -mb-px border-b-2
              ${activeTab === tab.id
                ? "text-orange-600 border-orange-500 bg-orange-50"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-5">
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Summary</p>
                <p className="text-sm text-gray-700 leading-relaxed">{notes.summary}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Key Points</p>
                <ul className="space-y-2.5">
                  {notes.keyPoints?.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "detailed" && (
            <motion.div key="detailed"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {notes.detailedNotes?.map((section, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-orange-100 transition-colors">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{section.heading}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "actions" && (
            <motion.div key="actions"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-2.5">
              {notes.actionItems?.length > 0 ? (
                notes.actionItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-orange-100 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 border-2 border-orange-400 rounded-lg text-orange-500 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-300">
                    <Icon.Check />
                  </div>
                  <p className="text-sm text-gray-400">No action items identified.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSaveNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
        >
          <Icon.Refresh />
          Analyse Another Video
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AINotesGenerator() {
  const [file, setFile]           = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [prompt, setPrompt]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [stage, setStage]         = useState(null);
  const [error, setError]         = useState(null);
  const [result, setResult]       = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    if (!videoTitle) {
      setVideoTitle(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }
  };

  const handleReset = () => {
    setFile(null);
    setVideoTitle("");
    setPrompt("");
    setError(null);
    setResult(null);
    setStage(null);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!file) return setError("Please upload a video file.");
    if (!prompt.trim()) return setError("Please enter a prompt describing what notes you need.");

    setError(null);
    setLoading(true);
    setStage("uploading");

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("prompt", prompt.trim());
      formData.append("videoTitle", videoTitle.trim() || file.name);

      const t1 = setTimeout(() => setStage("transcribing"), 3000);
      const t2 = setTimeout(() => setStage("generating"),   25000);
      const t3 = setTimeout(() => setStage("saving"),       45000);

      const response = await fetch(`${API_BASE}/ai-notes/generate`, {
        method: "POST",
        body: formData,
      });

      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setStage("saving");
      await new Promise((r) => setTimeout(r, 600));
      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setStage(null);
    }
  };

  const promptSuggestions = [
    "Summarize the main concepts",
    "Extract all technical terms",
    "Key takeaways for a beginner",
    "Generate study notes with examples",
    "Identify all action items",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Icon.Play />
            </div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight">AnnotateAI</span>
          </a>
          <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            AI Notes Generator
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
              <Icon.AI />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">AI Video Notes</h1>
              <p className="text-sm text-gray-400 font-normal">Upload a video, enter your prompt, get structured notes</p>
            </div>
          </div>
        </div>

        {/* Result or Form */}
        {result ? (
          <NotesDisplay
            notes={result.notes}
            videoTitle={result.videoTitle}
            prompt={result.prompt}
            onClose={handleReset}
            onSaveNew={handleReset}
          />
        ) : (
          <div className="space-y-5">

            {/* Upload */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Video File</p>
              <UploadZone
                file={file}
                onFileSelect={handleFileSelect}
                onRemove={() => { setFile(null); setVideoTitle(""); }}
              />
            </div>

            {/* Title + Prompt */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Video Title <span className="normal-case font-normal text-gray-300">(optional)</span>
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. React Hooks Deep Dive"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  What notes do you need?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Summarize key concepts and list all technical terms with definitions..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />
                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {promptSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setPrompt(s)}
                      className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-500 hover:text-orange-600 rounded-full transition-all font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <span className="text-red-500 flex-shrink-0 font-bold text-sm mt-0.5">⚠</span>
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Processing */}
            {loading && stage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-orange-100 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Processing your video</p>
                </div>
                <ProgressBar stage={stage} />
                <p className="text-xs text-gray-400 mt-5 text-center">
                  This may take 1–3 minutes depending on video length. Please don't close this page.
                </p>
              </motion.div>
            )}

            {/* Submit */}
            {!loading && (
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!file || !prompt.trim()}
                className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <Icon.Bolt />
                Generate AI Notes
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}