import LiveTable from "./LiveTable";
import LiveChart from "./LiveChart";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const Content = () => {
  const {
    dispatch,
    data: { displayIndex },
  } = useLiveChartContext();
  return (
    <div className="mx-auto max-w-7xl px-8 pb-12">
      <LiveChart />
      <div className="flex justify-center items-center pt-4 pb-6">
        <button
          onClick={() => dispatch({ type: "toggle_pause" })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {displayIndex === -1 ? "Pause" : "Resume"}
        </button>
      </div>
      <LiveTable />
    </div>
  );
};

export default Content;
