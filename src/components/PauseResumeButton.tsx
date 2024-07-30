import { Pause, Play } from "lucide-react";
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
      className="bg-blue-500 hover:bg-blue-700 rounded-full p-2"
      aria-label={displayIndex === -1 ? "Play" : "Pause"}
      title={displayIndex === -1 ? "Play" : "Pause"}
    >
      {displayIndex === -1 ? <Play color="white" /> : <Pause color="white" />}
    </button>
  );
};

export default PauseResumeButton;
