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
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Current Events
    </button>
  );
};

export default CurrentEventsButton;
