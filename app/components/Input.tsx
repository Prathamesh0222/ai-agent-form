import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  width?: "full" | "w-3/4";
}

export const Input = ({
  onChange,
  onKeyPress,
  value,
  placeholder,
  type,
  width = "full",
}: InputProps) => {
  const widthClass = width === "full" ? "w-full" : "w-3/4";

  return (
    <input
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      type={type}
      className={`p-2 mt-2 border border-white/20 focus:outline-none focus:ring-2 border-border/50 rounded-lg text-sm duration-300 transition-all ${widthClass}`}
    />
  );
};
