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
        className="w-full bg-neutral-700 rounded-md py-3 px-3 focus:outline-none border-2 border-transparent focus:border-neutral-400"
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
