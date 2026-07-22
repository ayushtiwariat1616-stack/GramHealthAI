import { HeartPulse } from "lucide-react";

export default function Header({ onHealth }) {
    const today = new Date().toLocaleDateString("en-GB");

    return (
        <header className="h-20 bg-linear-to-r from-blue-700 to-blue-600 border-b border-blue-500 px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">

                    <HeartPulse size={28} />

                </div>

                <div>

                    <h1 className="font-bold text-2xl">
                        GramHealthAI
                    </h1>

                    <p className="text-sm text-blue-100">
                        Trusted AI Health Assistant
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-8">
                <button
                    onClick={onHealth}
                    className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 transition"
                >
                    🩺 Health
                </button>

                <div className="text-right">

                    <div className="font-medium">
                        {today}
                    </div>

                    <div className="flex items-center gap-2 text-sm">

                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>

                        Online

                    </div>

                </div>

            </div>

        </header>
    );
}