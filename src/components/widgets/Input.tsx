import { FC, ReactElement, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  extraComponent?: ReactNode | ReactElement;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  extraComponent,
  required,
  register,
  errors,
  disabled,
  className,
}) => {
  return (
    <>
      {extraComponent ? (
        <>
          <fieldset className="w-full">
            <label
              htmlFor={id}
              className="text-sm font-semibold text-[#232F3E] leading-6"
            >
              {label}
            </label>
            <div
              className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 sm:text-sm sm:leading-6 
                  ${disabled && "opacity-50 cursor-default"}`}
            >
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required })}
                className="w-full bg-transparent px-2 py-2"
              />
              {extraComponent}
            </div>
            {errors[id] && (
              <span className="text-rose-500 block text-xs mt-[0.1rem] bg-white rounded-sm w-fit p-1">
                {errors[id]?.message as ReactNode}
              </span>
            )}
          </fieldset>
        </>
      ) : (
        <fieldset className="w-full">
          <label
            htmlFor={id}
            className="text-sm font-semibold text-[#232F3E] leading-6"
          >
            {label}
          </label>
          <div
            className={`mt-1 flex justify-center items-center gap-2 ${className}`}
          >
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              autoComplete={id}
              disabled={disabled}
              {...register(id, { required })}
              className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          ${errors[id] && "focus:ring-rose-500"}
          ${disabled && "opacity-50 cursor-default"}`}
            />
          </div>
          {errors[id] && (
            <span className="text-rose-500 text-xs block mt-[0.1rem] bg-white rounded-sm w-fit p-1">
              {errors[id]?.message as ReactNode}
            </span>
          )}
        </fieldset>
      )}
    </>
  );
};
