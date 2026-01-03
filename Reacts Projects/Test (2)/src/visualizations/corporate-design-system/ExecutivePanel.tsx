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

export default function ExecutivePanel({ data }: { data: any }) {
  const metrics = [
    {
      label: "Total Contributions",
      value: data.totalContributions,
      trend: "+12%",
      color: "from-blue-400 to-cyan-300",
    },
    {
      label: "Repositories",
      value: data.repositories,
      trend: "+2",
      color: "from-purple-400 to-pink-300",
    },
    {
      label: "Industry Percentile",
      value: `${data.industryPercentile}%`,
      trend: "TOP 1.3%",
      color: "from-green-400 to-emerald-300",
    },
    {
      label: "Complexity Score",
      value: data.complexityScore,
      trend: "ELITE",
      color: "from-amber-400 to-orange-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, i) => (
        <div key={i} className="glass-panel p-6 relative overflow-hidden group">
          <div
            className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${metric.color}`}
          />
          <h4 className="text-secondary text-sm font-medium uppercase tracking-wider mb-2">
            {metric.label}
          </h4>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold font-mono text-white">
              {metric.value}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white border border-white/10">
              {metric.trend}
            </span>
          </div>
          {/* Decorative background element on hover */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:bg-white/10 transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
}
