import { FC, Fragment, ReactNode, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

interface ModelProps {
  isOpen: boolean;
  onclose: () => void;
  children?: ReactNode;
  title?: string;
  feedBack?: boolean;
  rootClassName?: string;
  className?: string;
  pickup?: boolean;
}

export const Model: FC<ModelProps> = ({
  isOpen,
  onclose,
  children,
  title,
  feedBack,
  rootClassName,
  className,
  pickup,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleDialogClose = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click event occurred inside the dialog
    if (
      dialogRef.current &&
      isHTMLElement(event.target) &&
      dialogRef.current.contains(event.target)
    ) {
      onclose();
    }
  };

  // Helper function to check if an element is an HTMLElement
  function isHTMLElement(target: EventTarget | null): target is HTMLElement {
    return target instanceof HTMLElement;
  }
  return (
    // <Transition.Root show={isOpen} as={Fragment}>
    //   <Dialog
    //     as={"div"}
    //     className="relative z-30"
    //     static // Use the static prop to disable automatic closing
    //   >
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black/30" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
    //           enterTo="opacity-100 translate-y-0 xs:scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 translate-y-0 xs:scale-100"
    //           leaveTo="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
    //         >
    //           <Dialog.Panel
    //             className={`${rootClassName} relative transform overflow-hidden rounded-xl lg:rounded-3xl max-w-[95%] mx-auto w-full bg-white shadow-xl transition-all`}
    //           >
    //             <div
    //               className={`${className} pt-6 px-4 md:px-8 flex justify-between items-center`}
    //             >
    //               <Dialog.Title as="div" className="max-w-[85%] w-full">
    //                 <h2 className=" md:pl-8 text-start text-base md:text-2xl font-extrabold">
    //                   {title}
    //                 </h2>
    //               </Dialog.Title>

    //               {feedBack === true ? (
    //                 <button
    //                   type="button"
    //                   className="inline-flex w-8 h-8 lg:w-10 lg:h-10 justify-center items-center focus:outline-none "
    //                   onClick={onclose}
    //                 >
    //                   <RxCross2 className="text-black text-2xl lg:text-3xl" />
    //                 </button>
    //               ) : (
    //                 <button
    //                   type="button"
    //                   className="inline-flex w-6 h-6 lg:w-8 lg:h-8 bg-slate-400 justify-center items-center rounded-md  focus:outline-none "
    //                   onClick={onclose}
    //                 >
    //                   <FaTimes className="text-white lg:text-xl" />
    //                 </button>
    //               )}
    //             </div>
    //             {children}
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as={"div"}
        className="relative z-30"
        // static // Use the static prop to disable automatic closing
        onClose={() => {
          pickup ? '' : onclose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div
          className="fixed inset-0 overflow-y-auto"
          onClick={handleDialogClose}
        >
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
              enterTo="opacity-100 translate-y-0 xs:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 xs:scale-100"
              leaveTo="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
            >
              <Dialog.Panel
                className={`${rootClassName} relative transform overflow-hidden rounded-xl lg:rounded-3xl max-w-[95%] mx-auto w-full bg-white shadow-xl transition-all`}
                ref={dialogRef}
              >
                <div
                  className={`${className} pt-6 px-4 md:px-8 flex justify-between items-center`}
                >
                  <Dialog.Title as="div" className="max-w-[85%] w-full">
                    <h2 className="md:pl-8 text-start text-base md:text-2xl font-extrabold">
                      {title}
                    </h2>
                  </Dialog.Title>
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
                      className="inline-flex w-6 h-6 lg:w-8 lg:h-8 bg-slate-400 justify-center items-center rounded-md focus:outline-none "
                      onClick={onclose}
                    >
                      <FaTimes className="text-white lg:text-xl" />
                    </button>
                  )}
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
