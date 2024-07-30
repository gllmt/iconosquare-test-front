import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import useKeyPress from "../utils/hooks/useKeyPress";
import { useMemo } from "react";

const ForwardButton = () => {
  const {
    dispatch,
    displayIndex,
    data: { events },
  } = useLiveChartContext();

  const isEnable = useMemo(
    () =>
      events.length > 50 && displayIndex > -1 && displayIndex < events.length,
    [events, displayIndex]
  );

  const handleForward = () => {
    if (
      events.length > 50 &&
      displayIndex > -1 &&
      displayIndex < events.length
    ) {
      dispatch({
        type: "jump_to_event",
        payload: { index: displayIndex + 1 },
      });
    } else if (
      events.length > 50 &&
      displayIndex > -1 &&
      displayIndex === events.length
    ) {
      dispatch({
        type: "jump_to_event",
        payload: { index: events.length },
      });
    }
  };

  useKeyPress("ArrowRight", handleForward);

  return (
    <button
      disabled={!isEnable}
      onClick={handleForward}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        isEnable ? "opacity-100" : "opacity-35"
      }`}
    >
      Forward
    </button>
  );
};

export default ForwardButton;
