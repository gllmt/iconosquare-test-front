import { Undo } from "lucide-react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const ResetEventsButton = () => {
  const { dispatch } = useLiveChartContext();

  const handleResetEvents = () => {
    dispatch({ type: "reset_events" });
  };

  return (
    <button
      onClick={handleResetEvents}
      className="bg-red-500 hover:bg-red-700 rounded-full p-2"
      aria-label="Reset edits value"
      title="Reset edits value"
    >
      <Undo color="white" />
    </button>
  );
};

export default ResetEventsButton;
