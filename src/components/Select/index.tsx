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
        className="w-full bg-neutral-700 rounded-md py-3 px-3 focus:outline-none border-2 border-transparent focus:border-neutral-400"
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
