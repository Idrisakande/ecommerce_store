import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  icon?: IconType;
  iconSize?: number;
  children: ReactNode;
  fullWidth?: boolean;
  primary?: boolean;
  danger?: boolean;
  deepBlue?: boolean;
  lightBlue?: boolean;
  skyBlue?: boolean;
  deepGreen?: boolean;
  yellowGray?: boolean;
  className?: string;
  grayPurple?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  icon: Icon,
  iconSize,
  children,
  fullWidth,
  primary,
  danger,
  deepBlue,
  lightBlue,
  skyBlue,
  deepGreen,
  yellowGray,
  className,
  grayPurple,
}) => {
  return (
    // ${
    //     !primary &&
    //     !danger &&
    //     "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
    //   }
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 px-4 py-2
      md:text-base font-semibold focus-visible:outline text-[0.8rem] 
      focus-visible:outline-2 focus-visible:outline-offset-2
      ${className} 
      ${disabled && "opacity-50 cursor-default"} 
      ${fullWidth && "w-full"} 
      ${primary && "text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"} 
      ${
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
      } 
      ${deepBlue && "bg-[#0C0E3B]"}
      ${lightBlue && "bg-gradient-blue"}
      ${yellowGray && "bg-gradient-yellowGray text-black"}
      ${!primary && !deepBlue && !lightBlue && !skyBlue && !deepGreen && ""}
      ${skyBlue && "bg-gradient-leftRightBlue text-white"}
      ${deepGreen && "bg-[#1D9F51]"}
      ${grayPurple && "bg-gradient-grayPurpleGradient text-white"}
      `}
    >
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  );
};
