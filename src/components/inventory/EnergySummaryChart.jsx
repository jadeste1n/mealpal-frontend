import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EnergySummaryChart = ({ nutrition }) => {
  const { protein, carbs, fat, calories } = nutrition;

  // Convert grams to kcal (protein & carbs = 4 kcal/g, fat = 9 kcal/g)
  const proteinKcal = protein * 4;
  const carbsKcal = carbs * 4;
  const fatKcal = fat * 9;

  const total = proteinKcal + carbsKcal + fatKcal;
  const proteinPct = Math.round((proteinKcal / total) * 100);
  const carbsPct = Math.round((carbsKcal / total) * 100);
  const fatPct = 100 - proteinPct - carbsPct; // ensure total = 100

  return (
    <div className="flex gap-4 items-center">
      <div className="w-24 h-24">
        <CircularProgressbarWithChildren
          value={100}
          strokeWidth={12}
          styles={buildStyles({
            pathColor: "transparent",
            trailColor: "transparent",
          })}
        >
          {/* Carbs ring */}
          <CircularProgressbarWithChildren
            value={carbsPct}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#48CAE4",
              trailColor: "transparent",
            })}
          >
            {/* Protein ring inside */}
            <CircularProgressbarWithChildren
              value={proteinPct}
              strokeWidth={12}
              styles={buildStyles({
                pathColor: "#90EE90",
                trailColor: "transparent",
              })}
            >
              {/* Fat ring inside */}
              <CircularProgressbarWithChildren
                value={fatPct}
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: "#F25C3B",
                  trailColor: "transparent",
                })}
              >
                <div className="text-center text-sm font-semibold">
                  <div className="text-xl">{Math.round(calories)}</div>
                  <div className="text-xs text-gray-500">kcal</div>
                </div>
              </CircularProgressbarWithChildren>
            </CircularProgressbarWithChildren>
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>

      <div className="text-sm space-y-1">
        <p className="text-green-600 font-semibold">
          Protein ({proteinPct}%) – {protein}g
        </p>
        <p className="text-sky-500 font-semibold">
          Net Carbs ({carbsPct}%) – {carbs}g
        </p>
        <p className="text-red-500 font-semibold">
          Fat ({fatPct}%) – {fat}g
        </p>
      </div>
    </div>
  );
};

export default EnergySummaryChart;
