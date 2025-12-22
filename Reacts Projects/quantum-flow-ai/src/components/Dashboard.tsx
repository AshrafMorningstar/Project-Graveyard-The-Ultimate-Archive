/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  Cpu,
  Zap,
  TrendingUp,
  Activity,
  Server,
  Database,
  Network,
} from "lucide-react";
import "./Dashboard.css";

interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  name: string;
}

interface DashboardProps {
  theme: Theme;
}

// Generate dynamic data
const generateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    network: Math.random() * 100,
    quantum: Math.random() * 100,
  }));
};

const generateRadarData = () => {
  return [
    { subject: "Processing", A: 120, fullMark: 150 },
    { subject: "Memory", A: 98, fullMark: 150 },
    { subject: "Network", A: 86, fullMark: 150 },
    { subject: "Storage", A: 99, fullMark: 150 },
    { subject: "Quantum", A: 85, fullMark: 150 },
    { subject: "AI", A: 65, fullMark: 150 },
  ];
};

const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
  const [data, setData] = useState(generateData());
  const [radarData] = useState(generateRadarData());
  const [stats, setStats] = useState({
    quantumOps: 0,
    aiProcessed: 0,
    dataFlow: 0,
    efficiency: 0,
  });

  useEffect(() => {
    // Update data every 3 seconds
    const interval = setInterval(() => {
      setData(generateData());
      setStats({
        quantumOps: Math.floor(Math.random() * 10000),
        aiProcessed: Math.floor(Math.random() * 5000),
        dataFlow: Math.floor(Math.random() * 1000),
        efficiency: 85 + Math.random() * 15,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, unit, color }: any) => (
    <motion.div
      className="stat-card glass-card holographic"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stat-icon" style={{ color }}>
        <Icon size={40} />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <motion.div
          className="stat-value"
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value.toLocaleString()}
          <span className="stat-unit">{unit}</span>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard
          icon={Zap}
          title="Quantum Operations"
          value={stats.quantumOps}
          unit="/s"
          color={theme.primary}
        />
        <StatCard
          icon={Brain}
          title="AI Models Processed"
          value={stats.aiProcessed}
          unit=" models"
          color={theme.secondary}
        />
        <StatCard
          icon={Database}
          title="Data Flow"
          value={stats.dataFlow}
          unit=" GB/s"
          color={theme.tertiary}
        />
        <StatCard
          icon={Activity}
          title="System Efficiency"
          value={stats.efficiency.toFixed(1)}
          unit="%"
          color={theme.primary}
        />
      </div>

      <div className="charts-grid">
        <motion.div
          className="chart-card glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="chart-title">
            <TrendingUp size={24} />
            Real-Time Performance Metrics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.primary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.primary}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.secondary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.secondary}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10, 10, 20, 0.9)",
                  border: `1px solid ${theme.primary}`,
                  borderRadius: "10px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="cpu"
                stroke={theme.primary}
                fillOpacity={1}
                fill="url(#colorCpu)"
              />
              <Area
                type="monotone"
                dataKey="memory"
                stroke={theme.secondary}
                fillOpacity={1}
                fill="url(#colorMemory)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card glass-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="chart-title">
            <Server size={24} />
            System Resource Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={theme.primary} />
              <PolarAngleAxis
                dataKey="subject"
                stroke="rgba(255,255,255,0.7)"
              />
              <PolarRadiusAxis stroke="rgba(255,255,255,0.5)" />
              <Radar
                name="Performance"
                dataKey="A"
                stroke={theme.primary}
                fill={theme.primary}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card glass-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="chart-title">
            <Network size={24} />
            Network & Quantum Flow Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(10, 10, 20, 0.9)",
                  border: `1px solid ${theme.primary}`,
                  borderRadius: "10px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="network"
                stroke={theme.primary}
                strokeWidth={2}
                dot={{ fill: theme.primary, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="quantum"
                stroke={theme.secondary}
                strokeWidth={2}
                dot={{ fill: theme.secondary, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
