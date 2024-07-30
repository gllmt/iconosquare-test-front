import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import useKeyPress from "../utils/hooks/useKeyPress";

const ForwardButton = () => {
  const { dispatch, displayIndex } = useLiveChartContext();

  const handleForward = () => {
    if (displayIndex > 0) {
      dispatch({ type: "jump_to_event", payload: { index: displayIndex + 1 } });
    }
  };

  useKeyPress("ArrowRight", handleForward);

  return (
    <button
      onClick={handleForward}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Forward
    </button>
  );
};

export default ForwardButton;
