import React from "react";

interface IInput {
  name?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const Input: React.FC<IInput> = ({ name, setValue, placeholder, value }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.currentTarget.value);
  return (
    <div className="mt-2">
      <label htmlFor={name} className="block mb-2 capitalize">
        {name}
      </label>
      <input
        id={name}
        type="text"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
