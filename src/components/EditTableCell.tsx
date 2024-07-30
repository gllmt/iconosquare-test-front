import { ChangeEvent, useState } from "react";
import { z } from "zod";

type EditTableCellProps = {
  value: number;
  onChange: (value: number) => void;
  onEnter: () => void;
};

const schema = z.number().min(0).max(10000);

const EditTableCell = ({ value, onChange, onEnter }: EditTableCellProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    const result = schema.safeParse(parsedValue);

    if (result.success) {
      setError(null);
      onChange(parsedValue);
    } else {
      setError("Value must be between 0 and 10000");
    }
  };

  return (
    <>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
        onBlur={onEnter}
        autoFocus
        className="pl-1 max-w-20"
      />
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default EditTableCell;
