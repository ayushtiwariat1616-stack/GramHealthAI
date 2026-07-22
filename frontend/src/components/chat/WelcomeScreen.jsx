import { HeartPulse } from "lucide-react";
import QuickQuestions from "./QuickQuestions";

export default function WelcomeScreen({ onQuestion }) {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">

      <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
        <HeartPulse className="text-blue-700" size={48} />
      </div>

      <h1 className="text-5xl font-bold mt-6">
        Welcome to GramHealthAI
      </h1>

      <p className="text-slate-500 text-lg mt-4">
        Trusted AI Health Awareness Assistant
      </p>

      <QuickQuestions onQuestion={onQuestion} />

    </div>
  );
}