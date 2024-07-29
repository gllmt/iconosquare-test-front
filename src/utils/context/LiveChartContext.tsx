import { ReactNode, createContext, useReducer, useMemo } from "react";
import { createRandomEvent } from "../utils";
import { type Event } from "../utils";

type State = {
  events: Event[];
};

type Action = {
  type: string;
  payload?: Event;
};

export const LiveChartContext = createContext<{
  data: State;
  dispatch: React.Dispatch<Action>;
  displayEvents: Event[];
} | null>(null);

const initialEvents: Event[] = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData: State = {
  events: initialEvents,
};

const liveChartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "new_event":
      if (!action.payload) {
        throw new Error("Action payload is required");
      }
      return {
        events: [...state.events, action.payload],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const LiveChartProvider = ({ children }: { children: ReactNode }) => {
  const [data, dispatch] = useReducer<React.Reducer<State, Action>>(
    liveChartReducer,
    initialData
  );
  const displayEvents = useMemo(() => {
    const nbTotalEvents = data?.events?.length;
    return data.events.slice(nbTotalEvents - 20, nbTotalEvents);
  }, [data.events]);

  return (
    <LiveChartContext.Provider value={{ data, dispatch, displayEvents }}>
      {children}
    </LiveChartContext.Provider>
  );
};
