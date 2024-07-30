import LiveTable from "./LiveTable";
import LiveChart from "./LiveChart";
import PauseResumeButton from "./PauseResumeButton";
import ResetEventsButton from "./ResetEventsButton";
import ForwardButton from "./ForwardButton";
import BackwardButton from "./BackwardButton";

const Content = () => {
  return (
    <div className="mx-auto max-w-7xl px-8 pb-12">
      <LiveChart />
      <div className="flex justify-center items-center pt-4 pb-6 gap-4">
        <BackwardButton />
        <PauseResumeButton />
        <ResetEventsButton />
        <ForwardButton />
      </div>
      <LiveTable />
    </div>
  );
};

export default Content;
