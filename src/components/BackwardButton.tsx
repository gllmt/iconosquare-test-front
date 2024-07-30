import useKeyPress from "../utils/hooks/useKeyPress";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const BackwardButton = () => {
  const { dispatch, displayIndex } = useLiveChartContext();

  const handleBackward = () => {
    if (displayIndex > 0) {
      dispatch({ type: "jump_to_event", payload: { index: displayIndex - 1 } });
    }
  };

  useKeyPress("ArrowLeft", handleBackward);

  return (
    <button
      onClick={handleBackward}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Backward
    </button>
  );
};

export default BackwardButton;
