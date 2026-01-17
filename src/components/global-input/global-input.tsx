import React from "react";
import { Input } from "antd";

type GlobalInputProps = {
  type?: "text" | "number" | "password" | "currency";
  returnType?: "string" | "number";
  className?: string;
  onChange?: (value: string | number) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
};

const forbiddenKeys = ["e", "E", "+", "-", ".", ","];

const formatNumber = (value: string) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const removeSpaces = (value: string) => value.replace(/\s/g, "");

const GlobalInput: React.FC<GlobalInputProps> = ({
  type = "text",
  returnType = "string",
  className = "",
  onChange,
  value,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "currency") {
      if (forbiddenKeys.includes(e.key)) e.preventDefault();
      if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (type === "currency") {
      val = removeSpaces(val);
      val = val.replace(/[^\d]/g, "");
    }

    if (returnType === "number") {
      onChange?.(Number(val || 0));
    } else {
      onChange?.(val);
    }
  };

  const displayValue =
    type === "currency" ? formatNumber(String(value ?? "")) : value;

  return (
    <Input
      {...props}
      value={displayValue}
      type={type === "currency" ? "text" : type}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={className}
    />
  );
};

export default GlobalInput;
