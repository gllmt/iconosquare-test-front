import { useMemo } from "react";
import useKeyPress from "../utils/hooks/useKeyPress";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import { Rewind } from "lucide-react";

const BackwardButton = () => {
  const {
    dispatch,
    displayIndex,
    data: { events },
  } = useLiveChartContext();

  const isEnable = useMemo(
    () => events.length > 50 && displayIndex > 19,
    [events, displayIndex]
  );

  const handleBackward = () => {
    if (displayIndex > 19) {
      dispatch({ type: "jump_to_event", payload: { index: displayIndex - 1 } });
    }
  };

  useKeyPress("ArrowLeft", handleBackward);

  return (
    <button
      disabled={!isEnable}
      onClick={handleBackward}
      className={`bg-blue-500 hover:bg-blue-700 py-2 pl-2 pr-3 rounded ${
        isEnable ? "opacity-100" : "opacity-35"
      }`}
      aria-label="Backward"
      title="Backward"
    >
      <Rewind color="white" />
    </button>
  );
};

export default BackwardButton;
