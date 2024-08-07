import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const LiveChart = () => {
  const {
    displayEvents: eventsFiltered,
    displayIndex,
    dispatch,
  } = useLiveChartContext();

  // console.log(dispatch);

  const openCell = (chartEvent: any) => {
    // Open cell only work in pause mode
    if (displayIndex === -1) {
      dispatch({ type: "toggle_pause" });
    }

    const index = eventsFiltered[chartEvent.activeTooltipIndex].index;
    dispatch({
      type: "update_event_edition",
      payload: { index, key: "value1" },
    });
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          onClick={openCell}
          data={eventsFiltered}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="index" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="value1"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="value2"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
