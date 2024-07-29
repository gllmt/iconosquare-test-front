import { ReactNode, createContext, useReducer, useMemo } from "react";
import { createRandomEvent } from "../utils";
import { type Event } from "../utils";

type State = {
  events: Event[];
  displayIndex: number;
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
  displayIndex: -1,
};

const liveChartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "new_event":
      if (!action.payload) {
        throw new Error("Action payload is required");
      }
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "toggle_pause":
      return {
        ...state,
        displayIndex: state.displayIndex === -1 ? state.events.length - 1 : -1,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const displayEventsMemorizer = ({
  events,
  displayIndex,
}: {
  events: Event[];
  displayIndex: number;
}) => {
  if (displayIndex > -1) {
    // Return the 20 last events from the displayIndex
    return events.slice(displayIndex - 19, displayIndex + 1);
  } else {
    // Return live 20 last events
    const nbTotalEvents = events?.length;
    return events.slice(nbTotalEvents - 20, nbTotalEvents);
  }
};

export const LiveChartProvider = ({ children }: { children: ReactNode }) => {
  const [data, dispatch] = useReducer<React.Reducer<State, Action>>(
    liveChartReducer,
    initialData
  );

  const displayEvents = useMemo(() => displayEventsMemorizer(data), [data]);

  return (
    <LiveChartContext.Provider value={{ data, dispatch, displayEvents }}>
      {children}
    </LiveChartContext.Provider>
  );
};
