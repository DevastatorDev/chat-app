import React from "react";

interface InputInterface {
  placeholder: string;
  onChange?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function InputBox({
  placeholder,
  onChange,
  inputRef,
}: InputInterface) {
  return (
    <input
      type="text"
      className="px-4 py-2 border-2 border-gray rounded-xl w-full text-xl"
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef}
    />
  );
}
