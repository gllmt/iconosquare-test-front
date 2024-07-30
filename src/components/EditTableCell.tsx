type EditTableCellProps = {
  value: number;
  onChange: (value: number) => void;
  onEnter: () => void;
};

const EditTableCell = ({ value, onChange, onEnter }: EditTableCellProps) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
      onBlur={onEnter}
      autoFocus
    />
  );
};

export default EditTableCell;
