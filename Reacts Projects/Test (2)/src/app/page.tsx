/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { QuantumAnalyticsEngine } from "@/core/quantum-engine/QuantumAnalyticsEngine";
import ContributorGraph from "@/visualizations/holographic-renderer/ContributorGraph";
import ExecutivePanel from "@/visualizations/corporate-design-system/ExecutivePanel";
import InsightGrid from "@/visualizations/corporate-design-system/InsightGrid";

async function getData() {
  const engine = new QuantumAnalyticsEngine();
  return await engine.processGitHubData("AshrafMorningstar");
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <main className="min-h-screen p-8">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            NEXUS<span className="text-gradient">STATS</span>
          </h1>
          <p className="text-secondary text-lg">
            Analytics Protocol:{" "}
            <span className="text-blue-400">EXECUTIVE_TIER</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-secondary">Target Profile</p>
          <h2 className="text-2xl font-mono">AshrafMorningstar</h2>
        </div>
      </header>

      {/* Top Level Metrics */}
      <section className="mb-12">
        <ExecutivePanel data={data.enriched} />
      </section>

      {/* 3D Visualization */}
      <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-1 min-h-[500px]">
          <ContributorGraph data={data.patterns} />
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-4 border-b border-light pb-2">
            Predictive Intelligence
          </h3>
          <div className="space-y-6">
            {Object.entries(data.forecasts).map(([key, value]) => (
              <div key={key}>
                <p className="text-secondary text-sm capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xl font-mono text-cyan-400">
                  {value as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Strategic AI Insights</h3>
        <InsightGrid insights={data.insights} />
      </section>
    </main>
  );
}
