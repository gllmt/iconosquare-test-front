import { SkipForward } from "lucide-react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const CurrentEventsButton = () => {
  const { dispatch } = useLiveChartContext();

  const handleJumpToCurrent = () => {
    dispatch({
      type: "jump_to_event",
      payload: { index: -1 },
    });
  };

  return (
    <button
      onClick={handleJumpToCurrent}
      className="bg-green-500 hover:bg-green-700 rounded-full p-2"
      aria-label="Jump to current events"
      title="Jump to current events"
    >
      <SkipForward color="white" />
    </button>
  );
};

export default CurrentEventsButton;
