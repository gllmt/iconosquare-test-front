import { ReactNode, createContext, useReducer } from "react";
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
  return (
    <LiveChartContext.Provider value={{ data, dispatch }}>
      {children}
    </LiveChartContext.Provider>
  );
};
