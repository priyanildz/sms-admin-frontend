import clsx from "clsx";

export default function InputField({ label, type = "text", value, onChange, required = true, options = [] }) {
  const inputClass = clsx(
    "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  );

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select value={value} onChange={handleChange} required={required} className={inputClass}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type={type} value={value} onChange={handleChange} required={required} className={inputClass} />
    </div>
  );
}
