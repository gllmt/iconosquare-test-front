import { useContext } from "react";
import {
  LiveChartContext,
  LiveChartProvider,
} from "../context/LiveChartContext";

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error(
      "useLiveChartContext should be used within an LiveChartProvider"
    );
  }

  return context;
};

export { useLiveChartContext, LiveChartProvider };
