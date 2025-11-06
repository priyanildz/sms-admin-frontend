const SelectField = ({ label, name, value, options, onChange, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Fixed: pass the value directly
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt, index) => {
          // Handle both string arrays and object arrays
          if (typeof opt === 'string') {
            return (
              <option key={index} value={opt}>
                {opt === "" ? `Select ${label.replace(' *', '')}` : opt}
              </option>
            );
          } else {
            // Handle object format { value: "...", label: "..." }
            return (
              <option key={opt.value || index} value={opt.value}>
                {opt.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default SelectField;