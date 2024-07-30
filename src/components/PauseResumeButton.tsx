import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const PauseResumeButton = () => {
  const {
    dispatch,
    data: { displayIndex },
  } = useLiveChartContext();

  const handleTogglePause = () => {
    dispatch({ type: "toggle_pause" });
  };

  return (
    <button
      onClick={handleTogglePause}
      className="min-w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {displayIndex === -1 ? "Pause" : "Resume"}
    </button>
  );
};

export default PauseResumeButton;
