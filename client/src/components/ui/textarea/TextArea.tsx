import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  rows?: number | undefined;
}

const TextArea = ({ id, label, value, setValue, rows = 3 }: TextAreaProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
        rows={rows}
        required
      ></textarea>
    </div>
  );
};

export default TextArea;
