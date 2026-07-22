import {
  Activity,
  HeartPulse,
  ShieldAlert,
  Languages,
} from "lucide-react";

export default function HealthDashboard() {
  return (
    <aside className="hidden xl:flex w-80 flex-col gap-5 p-6">

      <GlassCard
        title="AI Status"
        icon={<Activity className="text-green-500" />}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          Online
        </div>
      </GlassCard>

      <GlassCard
        title="Health Tip"
        icon={<HeartPulse className="text-red-500" />}
      >
        Drink at least 2L of water today 💧
      </GlassCard>

      <GlassCard
        title="Emergency"
        icon={<ShieldAlert className="text-orange-500" />}
      >
        Call emergency services if symptoms become severe.
      </GlassCard>

      <GlassCard
        title="Language"
        icon={<Languages className="text-blue-500" />}
      >
        English
      </GlassCard>

    </aside>
  );
}

function GlassCard({ title, icon, children }) {
  return (
    <div className="rounded-3xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg p-5">

      <div className="flex items-center gap-3 font-semibold mb-4">

        {icon}

        {title}

      </div>

      <div className="text-slate-600 leading-7">

        {children}

      </div>

    </div>
  );
}