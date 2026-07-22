import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import HealthDrawer from "./HealthDrawer";

export default function ChatLayout({ children }) {
  const [healthOpen, setHealthOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header onHealth={() => setHealthOpen(true)} />

        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>

      </div>

      <HealthDrawer
        open={healthOpen}
        onClose={() => setHealthOpen(false)}
      />

    </div>
  );
}