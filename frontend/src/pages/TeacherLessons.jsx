import React, { useState } from 'react';
import { Sparkles, Clipboard, Check, RotateCcw, BrainCircuit, Lightbulb, Code2 } from 'lucide-react';

const TeacherLessons = () => {
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('quiz');
    const [difficulty, setDifficulty] = useState('Intermediate');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedOutput, setGeneratedOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!topic.trim()) return;
        setIsGenerating(true);
        setGeneratedOutput('');

        // Simulate real-time streaming tokens response from the AI backend engine
        setTimeout(() => {
            setIsGenerating(false);
            if (type === 'quiz') {
                setGeneratedOutput(
                    `### 🧠 AI-GENERATED ASSESSMENT BUNDLE: ${topic.toUpperCase()} (${difficulty})\n\n` +
                    `**Question 1:** What is the primary functional mechanic or architecture underlying this topic?\n` +
                    `*   A) Standard static runtime allocation\n` +
                    `*   B) Dynamic system reference caching\n` +
                    `*   C) Abstract thread management layer\n` +
                    `*   D) Virtual memory distribution stack\n\n` +
                    `**Correct Answer:** B\n` +
                    `*Explanation: This choice optimalizes execution latency overhead blocks across standard implementations.*`
                );
            }else {
                setGeneratedOutput(
                    `### 📑 AI-GENERATED SYLLABUS LESSON BREAKDOWN: ${topic.toUpperCase()} (${difficulty})\n\n` +
                    `#### 1. Core Foundational Architecture\n` +
                    `Understanding the theoretical parameters and core execution mechanisms governing this paradigm.\n\n` +
                    `#### 2. Technical Code Syntax Implementations\n` +
                    `Hands-on production logic pipelines ensuring strict object modeling parameters are explicitly maintained.\n\n` +
                    `#### 3. Enterprise Performance Strategy\n` +
                    `Advanced microservices patterns focused on high throughput and reduced structural overhead metrics.`
                );
            }
        }, 1500);
    };
     const handleCopy = () => {
        navigator.clipboard.writeText(generatedOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="space-y-8">
            {/* 📁 Header Row */}
            <div>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="fill-indigo-600" /> Integrated AI Engine Layer
                </p>
                <h2 className="text-2xl font-bold text-slate-800">AI Lesson Assistant</h2>
            </div>
            {/* 🗂️ Split Workspace: Parameters Form (Left) & Live Canvas Preview (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                {/* Parameters Input Form (Left 2-Columns) */}
                <form onSubmit={handleGenerate} className="lg:col-span-2 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm space-y-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <BrainCircuit size={14} /> Generator Prompts Matrix
                    </h3>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-2">Target Academic Subject / Topic</label>
                        <input 
                            type="text"
                            placeholder="e.g., Java Loops, SQL Joins, React Hooks"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800 font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-2">Generation Output Target</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setType('quiz')}
                                className={`p-3 rounded-xl border text-xs font-bold transition ${
                                    type === 'quiz' 
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70'
                                }`}
                            >
                                Multiple-Choice Quiz
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('summary')}
                                className={`p-3 rounded-xl border text-xs font-bold transition ${
                                    type === 'summary' 
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70'
                                }`}
                            >
                                Syllabus Summary
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-2">Complexity Depth Scale</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700 font-medium"
                        >
                            <option value="Beginner/Introductory">Beginner / Introductory</option>
                            <option value="Intermediate">Intermediate Core</option>
                            <option value="Advanced Enterprise">Advanced Enterprise</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isGenerating || !topic.trim()}
                        className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm shadow-indigo-600/10"
                    >
                        <Sparkles size={16} className={isGenerating ? 'animate-spin' : ''} />
                        {isGenerating ? 'Compiling AI Response Matrix...' : 'Synthesize Curriculum Material'}
                    </button>
                </form>
                {/* Live Canvas Preview (Right 3-Columns) */}
                <div className="lg:col-span-3 space-y-4 h-full flex flex-col">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            {/* <Code2 size={14} /> Output Sandbox Terminal Canvas */}
                            Output Sandbox Terminal Canvas
                        </h3>
                        {generatedOutput && (
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition bg-white border border-slate-200/80 px-2.5 py-1.5 rounded-lg shadow-sm"
                            >
                                {copied ? <Check size={14} className="text-emerald-600" /> : <Clipboard size={14} />}
                                {copied ? 'Copied Buffer!' : 'Copy to Clipboard'}
                            </button>
                        )}
                    </div>
                    {/* Content Canvas Screen Canvas View (Right 3-Columns) */}
                    <div className="lg:col-span-3 space-y-4 h-full flex flex-col">

                        <div className="flex-1 bg-slate-900 border border-slate-950 rounded-2xl shadow-xl min-h-[360px] p-6 text-slate-300 font-sans text-sm overflow-y-auto flex flex-col relative">
                            {/* Real-time Streaming Processing Overlay Layer */}
                            {isGenerating && (
                                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-10 rounded-2xl">
                                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-xs font-mono text-slate-400 tracking-wider">Querying Spring-AI Prompt Infrastructure Layers...</p>
                                </div>
                            )}

                            {/* Empty Input System Canvas Placeholder View */}
                            {!generatedOutput && !isGenerating ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                                    <Lightbulb size={32} className="text-slate-600 stroke-[1.5]" />
                                    <p className="text-xs max-w-sm">Provide a subject title target inside the configuration parameters block matrix to construct optimized real-time classroom training assets.</p>
                                </div>
                            ) : (
                                /* Active Live Synthesized Output Mark Render Matrix */
                                <div className="whitespace-pre-line leading-relaxed font-sans prose prose-invert max-w-none text-slate-200">
                                    {generatedOutput}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TeacherLessons;
