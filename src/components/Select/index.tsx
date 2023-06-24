import React from "react";

interface ISelect {
  name: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
}

const Select: React.FC<ISelect> = ({ name, value, setValue, options }) => {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setValue(e.currentTarget.value);

  return (
    <div className="mt-2">
      <label htmlFor={name} className="block mb-2 capitalize">
        {name}
      </label>
      <select
        id={name}
        onChange={onChange}
        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
