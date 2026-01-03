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

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useThemeStore } from "../store";

const data = [
  { name: "Jan", value: 4000, growth: 2400, efficiency: 2400 },
  { name: "Feb", value: 3000, growth: 1398, efficiency: 2210 },
  { name: "Mar", value: 2000, growth: 9800, efficiency: 2290 },
  { name: "Apr", value: 2780, growth: 3908, efficiency: 2000 },
  { name: "May", value: 1890, growth: 4800, efficiency: 2181 },
  { name: "Jun", value: 2390, growth: 3800, efficiency: 2500 },
  { name: "Jul", value: 3490, growth: 4300, efficiency: 2100 },
];

const pieData = [
  { name: "Neural Networks", value: 400 },
  { name: "Quantum Computing", value: 300 },
  { name: "Blockchain", value: 300 },
  { name: "Cloud Systems", value: 200 },
];

const DataVisualizations = () => {
  const { currentTheme } = useThemeStore();

  const colorSchemes = {
    cyber: {
      primary: "#00f0ff",
      secondary: "#ff00ff",
      accent: "#ffff00",
      gradient: ["#00f0ff", "#ff00ff", "#ffff00", "#00ff88"],
    },
    quantum: {
      primary: "#7b2cbf",
      secondary: "#c77dff",
      accent: "#e0aaff",
      gradient: ["#7b2cbf", "#c77dff", "#e0aaff", "#5a189a"],
    },
    bio: {
      primary: "#00ff88",
      secondary: "#00ffcc",
      accent: "#88ffdd",
      gradient: ["#00ff88", "#00ffcc", "#88ffdd", "#00aa66"],
    },
  };

  const colors = colorSchemes[currentTheme];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-2xl p-6 neon-border"
        style={{ borderColor: colors.primary }}
      >
        <h3
          className="text-xl font-bold mb-4 neon-text"
          style={{ color: colors.primary }}
        >
          Performance Metrics
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`colorValue-${currentTheme}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={colors.primary}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke={colors.primary} />
            <YAxis stroke={colors.primary} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: `1px solid ${colors.primary}`,
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              fillOpacity={1}
              fill={`url(#colorValue-${currentTheme})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-strong rounded-2xl p-6 neon-border"
        style={{ borderColor: colors.secondary }}
      >
        <h3
          className="text-xl font-bold mb-4 neon-text"
          style={{ color: colors.secondary }}
        >
          Growth Analysis
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke={colors.secondary} />
            <YAxis stroke={colors.secondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: `1px solid ${colors.secondary}`,
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="growth"
              fill={colors.secondary}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-strong rounded-2xl p-6 neon-border"
        style={{ borderColor: colors.accent }}
      >
        <h3
          className="text-xl font-bold mb-4 neon-text"
          style={{ color: colors.accent }}
        >
          Efficiency Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke={colors.accent} />
            <YAxis stroke={colors.accent} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: `1px solid ${colors.accent}`,
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke={colors.accent}
              strokeWidth={3}
              dot={{ fill: colors.accent, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-strong rounded-2xl p-6 neon-border"
        style={{ borderColor: colors.primary }}
      >
        <h3
          className="text-xl font-bold mb-4 neon-text"
          style={{ color: colors.primary }}
        >
          Technology Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors.gradient[index % colors.gradient.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: `1px solid ${colors.primary}`,
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default DataVisualizations;
