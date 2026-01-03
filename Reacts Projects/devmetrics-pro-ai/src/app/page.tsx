/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 text-center max-w-5xl space-y-8 glass-panel p-12 rounded-3xl border-t border-white/10 shadow-2xl">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-violet-300 uppercase mb-4">
          v1.0.0 Beta Available Now
        </div>
        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 tracking-tighter leading-tight pb-2">
          DevMetrics<span className="text-violet-500">Pro</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          AI-Enhanced Developer Analytics Platform. <br />
          Transform your GitHub data into stunning cinematic visualizations.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] min-w-[200px]">
            Connect GitHub
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm min-w-[200px]">
            View Gallery
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-16 text-left border-t border-white/5 mt-12">
          {[
            {
              title: "AI Insights",
              desc: "Deep analysis using GPT-4 for code patterns and growth trajectories.",
            },
            {
              title: "Cinematic 4K",
              desc: "Render 60fps videos perfect for LinkedIn and portfolios.",
            },
            {
              title: "Multi-Platform",
              desc: "Unified analytics from GitHub, GitLab & StackOverflow.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/0 hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-white/50" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-500 text-sm">
        © 2025 DevMetrics Pro. Designed by AshrafMorningstar.
      </footer>
    </main>
  );
}
