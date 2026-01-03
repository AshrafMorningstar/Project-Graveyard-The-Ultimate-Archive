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

import { Zap, TrendingUp, Award, Target } from "lucide-react";

export default function InsightGrid({ insights }: { insights: any[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "STRENGTH":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "OPPORTUNITY":
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((insight, i) => (
        <div
          key={i}
          className="glass-panel p-6 flex gap-4 items-start hover:border-cyan-500/30 transition-colors cursor-default"
        >
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 shrink-0">
            {getIcon(insight.type)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-secondary uppercase tracking-wider">
                {insight.type}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
              {insight.title}
            </h4>
            <p className="text-secondary text-sm leading-relaxed">
              {insight.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
