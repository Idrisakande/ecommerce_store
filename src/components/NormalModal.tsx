import { FC, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

interface NormalModalProps {
  isOpen: boolean;
  onclose: () => void;
  children?: ReactNode;
  title?: string;
  feedBack?: boolean;
  rootClassName?: string;
  className?: string;
}

export const NormalModal: FC<NormalModalProps> = ({
  isOpen,
  onclose,
  children,
  title,
  feedBack,
  rootClassName,
  className,
}) => {
  return (
    <div
      onClick={onclose}
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center bg-black/30 z-30 transition-all duration-500`}
    >
      <div className="z-50">
      <div className="bg-white p-4 rounded-xl lg:rounded-3xl">
        <div
          className={`${className} pt-6 px-4 md:px-8 flex justify-between items-center`}
        >
          <div className="max-w-[85%] w-full">
            <h2 className=" md:pl-8 text-start text-base md:text-2xl font-extrabold">
              {title}
            </h2>
          </div>

          {feedBack === true ? (
            <button
              type="button"
              className="inline-flex w-8 h-8 lg:w-10 lg:h-10 justify-center items-center focus:outline-none "
              onClick={onclose}
            >
              <RxCross2 className="text-black text-2xl lg:text-3xl" />
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex w-6 h-6 lg:w-8 lg:h-8 bg-slate-400 justify-center items-center rounded-md  focus:outline-none "
              onClick={onclose}
            >
              <FaTimes className="text-white lg:text-xl" />
            </button>
          )}
        </div>
        {children}
      </div>
      </div>
    </div>
  );
};
