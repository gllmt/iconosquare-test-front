import { useContext } from "react";
import { ReactNode, createContext, useReducer, useMemo, Dispatch } from "react";
import { createRandomEvent } from "../utils";
import { type Event } from "../utils";

type State = {
  events: Event[];
  displayIndex: number;
};

type NewEventAction = { type: "new_event"; payload: Event };
type TogglePauseAction = { type: "toggle_pause" };
type UpdateEventAction = {
  type: "update_event";
  payload: { index: number; key: string; value: number };
};
type UpdateEventEditionAction = {
  type: "update_event_edition";
  payload: { index: number; key: string };
};
type JumpToEventAction = { type: "jump_to_event"; payload: { index: number } };
type ResetEventsAction = { type: "reset_events" };

type Action =
  | NewEventAction
  | TogglePauseAction
  | UpdateEventAction
  | UpdateEventEditionAction
  | JumpToEventAction
  | ResetEventsAction;

const LiveChartContext = createContext<{
  data: State;
  dispatch: Dispatch<Action>;
  displayEvents: Event[];
  displayIndex: number;
  focusedEvent: Event | null;
} | null>(null);

const initialEvents: Event[] = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData: State = {
  events: initialEvents,
  displayIndex: -1,
};

// Update the event value and archive the original value
const actionUpdateEvent = (state: State, action: Action) => {
  if (action.type !== "update_event") {
    throw new Error("Invalid action type");
  }
  const { index, key, value } = action.payload;
  const event = state.events.find((event) => event.index === index);

  if (!event) {
    throw new Error(`Event with index ${index} not found`);
  }

  const valueKey = key as "value1" | "value2";
  const oldValueKey = `old_${key}` as "old_value1" | "old_value2";

  if (event[oldValueKey] === -1) {
    event[oldValueKey] = event[valueKey];
  }
  event[valueKey] = value;

  return {
    ...state,
  };
};

// Update the event edition mode
const actionUpdateEventEdition = (state: State, action: Action) => {
  if (action.type !== "update_event_edition") {
    throw new Error("Invalid action type");
  }
  const { index, key } = action.payload;

  // Reset the edition mode for all events except the one asked
  state.events.forEach((event) => {
    if (event.index !== index) {
      event.inEdit = "";
    } else {
      event.inEdit = key;
    }
  });

  return {
    ...state,
  };
};

const actionResetEvents = (state: State) => {
  state.events.forEach((event) => {
    if (event.old_value1 !== -1) {
      event.value1 = event.old_value1;
    }
    event.old_value1 = -1;

    if (event.old_value2 !== -1) {
      event.value2 = event.old_value2;
    }
    event.old_value2 = -1;

    event.inEdit = "";
  });

  return {
    ...state,
  };
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
    case "jump_to_event":
      return {
        ...state,
        displayIndex: action.payload.index,
      };
    case "update_event":
      return actionUpdateEvent(state, action);
    case "update_event_edition":
      return actionUpdateEventEdition(state, action);
    case "reset_events":
      return actionResetEvents(state);
    default: {
      throw new Error(`Unhandled action type: ${action}`);
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

// Return the event that is in edition mode
const focusedEventMemorizer = ({
  events,
}: {
  events: Event[];
}): Event | null => {
  return events.find((event) => event.inEdit) || null;
};

const LiveChartProvider = ({ children }: { children: ReactNode }) => {
  const [data, dispatch] = useReducer<React.Reducer<State, Action>>(
    liveChartReducer,
    initialData
  );

  const displayEvents = useMemo(() => displayEventsMemorizer(data), [data]);

  const focusedEvent = useMemo(() => focusedEventMemorizer(data), [data]);

  return (
    <LiveChartContext.Provider
      value={{
        data,
        dispatch,
        displayEvents,
        displayIndex: data.displayIndex,
        focusedEvent,
      }}
    >
      {children}
    </LiveChartContext.Provider>
  );
};

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
