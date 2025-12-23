import React from "react";
import { Users, Layers, Wallet, AlertCircle, CreditCard } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  bg: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, bg, icon }) => {
  return (
    <div
      className={`p-4 rounded-2xl shadow-sm bg-gradient-to-br ${bg} text-black flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-medium opacity-70">{title}</span>
        <div className="text-black/40">{icon}</div>
      </div>
      <span className="text-[26px] font-bold">{value}</span>
    </div>
  );
};

const StatsCards = () => {
  const stats = [
    {
      title: "Jami o‘quvchilar",
      value: 284,
      bg: "from-[var(--grad-blue-from)] to-[var(--grad-blue-to)]",
      icon: <Users size={24} />,
    },
    {
      title: "Aktiv guruhlar",
      value: 12,
      bg: "from-[var(--grad-emerald-from)] to-[var(--grad-emerald-to)]",
      icon: <Layers size={24} />,
    },
    {
      title: "Joriy oy to‘lovlari",
      value: "24 000 000 so'm",
      bg: "from-[var(--grad-softblue-from)] to-[var(--grad-softblue-to)]",
      icon: <Wallet size={24} />,
    },
    {
      title: "Kutilayotgan to‘lovlar (oylik)",
      value: "32 400 000 so'm",
      bg: "from-[var(--grad-indigo-from)] to-[var(--grad-indigo-to)]",
      icon: <CreditCard size={24} />,
    },
    {
      title: "Qarzdorlar soni",
      value: 37,
      bg: "from-[var(--grad-rose-from)] to-[var(--grad-rose-to)]",
      icon: <AlertCircle size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
