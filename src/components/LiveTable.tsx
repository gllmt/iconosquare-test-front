import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

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
    if (focusedEvent?.index !== index && focusedEvent?.inEdit !== key) {
      dispatch({ type: "update_event_edition", payload: { index, key } });
    }
  };

  const updateEventValue = (index: number, key: string, value: string) => {
    dispatch({ type: "update_event", payload: { index, key, value } });
  };

  const closeCell = (index: number) => {
    // Reset the event edition mode
    dispatch({ type: "update_event_edition", payload: { index, key: null } });
  };
  return (
    <div className="flex border border-gray-300 rounded">
      <div>
        <div className="p-2">Index</div>
        <div className="p-2 border-t border-gray-300">Value 1</div>
        <div className="p-2 border-t border-gray-300">Value 2</div>
      </div>
      {eventsFiltered.map((event) => (
        <div key={event.index} className="border-l border-gray-300 flex-1">
          <div className="p-2">{event.index}</div>
          <div
            className="p-2 border-t border-gray-300 cursor-pointer"
            onClick={() => openCell(event.index, "value1")}
          >
            {focusedEvent?.index === event.index &&
              focusedEvent?.inEdit === "value1" && (
                <input
                  type="text"
                  value={focusedEvent?.value1}
                  onChange={(e) =>
                    updateEventValue(event.index, "value1", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      closeCell(event.index);
                    }
                  }}
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
                <input
                  type="text"
                  value={focusedEvent?.value2}
                  onChange={(e) =>
                    updateEventValue(event.index, "value2", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      closeCell(event.index);
                    }
                  }}
                />
              )}
            {event.value2}
          </div>
        </div>
      ))}
    </div>
  );
};

LiveTable.propTypes = {};

export default LiveTable;
