import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const ResetEventsButton = () => {
  const { dispatch } = useLiveChartContext();

  const handleResetEvents = () => {
    dispatch({ type: "reset_events" });
  };

  return (
    <button
      onClick={handleResetEvents}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Reset Events
    </button>
  );
};

export default ResetEventsButton;
