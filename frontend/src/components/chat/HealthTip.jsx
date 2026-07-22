import { Lightbulb } from "lucide-react";

export default function HealthTip() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Lightbulb className="text-yellow-500" />
        <h3 className="font-semibold">
          Today's Health Tip
        </h3>
      </div>

      <p className="text-slate-600">
        Drink clean boiled water whenever possible to reduce
        water-borne diseases.
      </p>
    </div>
  );
}