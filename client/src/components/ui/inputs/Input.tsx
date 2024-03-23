import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`shadow-sm rounded-md w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
