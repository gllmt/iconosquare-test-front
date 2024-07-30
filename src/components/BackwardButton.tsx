import { useMemo } from "react";
import useKeyPress from "../utils/hooks/useKeyPress";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

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
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        isEnable ? "opacity-100" : "opacity-35"
      }`}
    >
      Backward
    </button>
  );
};

export default BackwardButton;
