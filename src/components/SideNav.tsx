"use-client";

import Link from "next/link";
import { FC, Fragment, useEffect } from "react";
import { HiTag } from "react-icons/hi";
import { categoryLink, helpsLinks } from "@/constants/data";
import { MdHelp } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { AccordionComponent } from "@/components/widgets/AccordionComponent";

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideNav: FC<SideNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed top-[5rem] w-full h-[calc(100vh-5rem)] inset-x-0 z-30 md:hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed top-[5rem] h-[calc(100vh-5rem)] inset-x-0 bg-orange-200/50 transition-opacity" />
        </Transition.Child>

        <div className="pointer-events-none fixed top-[5rem] h-[calc(100vh-5rem)] left-0 w-full flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto max-w-[18rem] sm:max-w-xs w-full h-full bg-white overflow-y-scroll pt-4 pb-10 text-afruna-blue">
              <div className="w-full flex flex-col gap-1">
                <div className="px-2">
                  <Link
                    href={"/"}
                    className="flex gap-1 justify-start items-center p-2 rounded-md hover:bg-slate-100 transition duration-300"
                  >
                    <HiTag size={18} className="text-black/90" />{" "}
                    <span className="text-[0.95rem] font-semibold">
                      Sell on Afruna
                    </span>
                  </Link>
                </div>

                <div className="px-2">
                  <AccordionComponent
                    triggerExtraComponent={
                      <div className="flex justify-start items-center gap-1">
                        <MdHelp className="text-lg text-black/90" />
                        <span>Help</span>
                      </div>
                    }
                    triggerClassName={`text-[0.95rem] bg-slate-200 font-semibold px-2 py-3 rounded-md`}
                    helps={helpsLinks}
                    linkClassName={`text-xs font-semibold hover:bg-slate-100 rounded-md hover:cursor-pointer hover:scale-105 transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
                  />
                </div>
              </div>

              <div className="w-full border-t border-slate-200" />

              <div className="px-2">
                <AccordionComponent
                  triggerText={`Afruna Services`}
                  triggerClassName={`text-[0.95rem] font-semibold px-2 py-3 rounded-md`}
                  items={null}
                  linkClassName={`text-[0.8rem] font-semibold hover:bg-afruna-gold/5 hover:shadow-sm transition duration-300 w-full mx-auto max-w-[90%] p-2`}
                />
              </div>

              <div className="w-full border-t border-slate-200" />

              <div className="px-2">
                <AccordionComponent
                  triggerText={`All Category`}
                  triggerClassName={`text-[0.95rem] font-semibold px-2 py-3 rounded-md`}
                  items={categoryLink}
                  linkClassName={`text-xs font-semibold hover:bg-slate-100 rounded-md hover:cursor-pointer hover:scale-105 transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
                />
              </div>

              <div className="w-full border-t border-slate-200" />

              <h2 className="text-[0.95rem] ml-4 font-semibold pt-2">
                Settings
              </h2>

              <div className="px-2">
                <AccordionComponent
                  triggerExtraComponent={
                    <div className="flex justify-start items-center gap-1">
                      <RiGlobalLine className="text-lg text-black/90" />
                      <span>Language</span>
                    </div>
                  }
                  triggerClassName={`text-sm font-semibold px-2 py-3 rounded-md`}
                  languages={[
                    { id: "1", value: "english", language: "EN - English" },
                    { id: "2", value: "french", language: "FR - French" },
                  ]}
                  linkClassName={`text-xs font-semibold rounded-md transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
                />
              </div>

              <div className="px-2">
                <AccordionComponent
                  triggerExtraComponent={
                    <div className="flex justify-start items-center gap-1">
                      <FaDollarSign className="text-lg text-black/90" />
                      <span>Currency, USD</span>
                    </div>
                  }
                  triggerClassName={`text-sm font-semibold px-2 py-3 rounded-md`}
                  currencys={[
                    { currency: "Ameriacan - Dollar" },
                    { currency: "Ghana - Cedi" },
                    { currency: "Nigeria - Naira" },
                  ]}
                  linkClassName={`text-xs font-semibold hover:bg-slate-100 rounded-md hover:cursor-pointer hover:scale-105 transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
