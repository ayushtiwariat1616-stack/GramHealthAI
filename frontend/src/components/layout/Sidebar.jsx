import {
  PlusSquare,
  History,
  HeartPulse,
  Info,
} from "lucide-react";

import HealthTip from "../chat/HealthTip";

const chats = [
  "Malaria",
  "Nutrition",
  "Vaccination",
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0">

      <div className="p-6">

        <h2 className="font-bold text-xl">
          GramHealthAI
        </h2>

        <p className="text-sm text-slate-500">
          AI Health Platform
        </p>

      </div>

      <nav className="px-3">

        <SidebarButton icon={PlusSquare} title="New Chat" />
        <SidebarButton icon={History} title="Recent Chats" />
        <SidebarButton icon={HeartPulse} title="Health Tips" />
        <SidebarButton icon={Info} title="About" />

      </nav>

      <div className="px-4 mt-8">

        <h3 className="font-semibold mb-3">
          Recent
        </h3>

        {chats.map(chat => (
          <div
            key={chat}
            className="rounded-lg px-3 py-2 hover:bg-slate-100 cursor-pointer"
          >
            {chat}
          </div>
        ))}

      </div>

      <div className="mt-auto p-4">

        <HealthTip />

        <div className="mt-5 text-center text-xs text-slate-400">
          Version 1.0
        </div>

      </div>

    </aside>
  );
}

function SidebarButton({ icon: Icon, title }) {
  return (
    <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100 transition">
      <Icon size={20} />
      {title}
    </button>
  );
}