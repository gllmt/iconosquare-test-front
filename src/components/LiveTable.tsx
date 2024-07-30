import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import EditTableCell from "./EditTableCell";

const LiveTable = () => {
  const {
    displayEvents: eventsFiltered,
    displayIndex,
    dispatch,
    focusedEvent,
  } = useLiveChartContext();

  const openCell = (index: number, key: string) => {
    // Open cell only work in pause mode
    if (displayIndex === -1) {
      dispatch({ type: "toggle_pause" });
    }

    // Set openedCell only if it's another one
    if (focusedEvent?.index !== index || focusedEvent?.inEdit !== key) {
      dispatch({ type: "update_event_edition", payload: { index, key } });
    }
  };

  const updateEventValue = (index: number, key: string, value: number) => {
    dispatch({ type: "update_event", payload: { index, key, value } });
  };

  const closeCell = (index: number) => {
    // Reset the event edition mode
    dispatch({ type: "update_event_edition", payload: { index, key: "" } });
  };
  return (
    <div className="flex flex-row border border-gray-300 rounded overflow-hidden w-full">
      <div className="flex flex-col max-w-40">
        <div className="p-2">Index</div>
        <div className="p-2 border-t border-gray-300">Value 1</div>
        <div className="p-2 border-t border-gray-300">Value 2</div>
      </div>
      <div className="flex flex-row overflow-x-auto max-w-full w-[calc(100%-70px)]">
        {eventsFiltered.map((event) => (
          <div key={event.index} className="border-l border-gray-300 flex-1">
            <div className="p-2">{event.index}</div>
            <div
              className="p-2 border-t border-gray-300 cursor-pointer"
              onClick={() => openCell(event.index, "value1")}
            >
              {focusedEvent?.index === event.index &&
                focusedEvent?.inEdit === "value1" && (
                  <EditTableCell
                    value={focusedEvent?.value1}
                    onChange={(value) =>
                      updateEventValue(event.index, "value1", value)
                    }
                    onEnter={() => closeCell(event.index)}
                  />
                )}
              {event.value1}
            </div>
            <div
              className="p-2 border-t border-gray-300 cursor-pointer"
              onClick={() => openCell(event.index, "value2")}
            >
              {focusedEvent?.index === event.index &&
                focusedEvent?.inEdit === "value2" && (
                  <EditTableCell
                    value={focusedEvent?.value2}
                    onChange={(value) =>
                      updateEventValue(event.index, "value2", value)
                    }
                    onEnter={() => closeCell(event.index)}
                  />
                )}
              {event.value2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTable;
