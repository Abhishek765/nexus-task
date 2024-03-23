import React, { useState } from "react";
import { OptionType } from "./types";
import { BackIcon } from "../../../../assets/svg/svgLinks";

type SelectProps<T> = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  options: OptionType[];
};

const Select = <T,>({ label, value, setValue, options }: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen((isOpen) => !isOpen);
  };

  const handleOptionClick = (optionValue: OptionType["value"]) => {
    toggleAccordion();
    setValue(optionValue as T);
  };

  return (
    <div>
      <label htmlFor="status" className="block mb-1 font-semibold">
        {label}
      </label>

      <div
        className={`cursor-not-allowed md:cursor-default border-[1px] border-gray-300 rounded-lg `}
      >
        <div
          className={`flex flex-row items-center justify-between md:cursor-pointer pl-2 md:py-2`}
          onClick={toggleAccordion}
        >
          <div className="flex flex-row items-center justify-start gap-[24px]">
            <p className="font-bold">{value}</p>
          </div>

          <div
            className={`my-auto md:scale-100 scale-75  items-center flex md:mr-3 md:w-6`}
          >
            <img
              src={BackIcon}
              alt="BackIcon"
              className={`${open ? "-rotate-90" : "rotate-90"} `}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300  ${
            open ? "block" : "hidden"
          } divide-y divide-solid`}
        >
          {options.map((option) => {
            return (
              <div
                className={`py-2 text-sm text-gray-500 bg-gray-100/25 px-2 hover:bg-gray-200 cursor-pointer font-semibold`}
                key={option.key}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Select;
