/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdHelp, MdSupportAgent } from "react-icons/md";

import { ItemPicker } from "../widgets/ItemPicker";
import svgs from "@/constants/svgs";
import { useRouter } from "next/router";

export const AuthHeader = memo(() => {
  const router = useRouter();
  const handleHelpSelection = useCallback((value: string) => {
    switch (value) {
      case "FAQs":
        router.push("faq");
        break;

      default:
        router.push("contact");
        break;
    }
  }, []);

  const HELP = ["FAQs", "Contact Us"];

  return (
    <header className="sticky top-0 bg-gradient-to-r from-orange-300 to-orange-100 z-10 ">
      <nav className="relative h-[5.5rem] pb-2 flex items-end justify-between max-w-[90%] mx-auto">
        <div className="flex w-full md:justify-center md:items-center">
          <Link href={"/"} className="">
            {/* <div className=" relative"> */}
            <Image
              src={svgs.logo}
              alt="Afruna_Logo"
              priority
              className="w-[9rem] h-[3rem] md:w-[15rem] md:h-[rem]"
            />
          </Link>
        </div>
        <ItemPicker
          leftTriggerIcon={<MdHelp className="text-xl" />}
          contentClassName={
            "bg-white p-4 text-afruna-blue w-40 text-xs z-20 rounded-md"
          }
          triggerClassName={"flex space-x-2 items-center text-afruna-blue"}
          getSelected={handleHelpSelection}
          items={HELP}
          placeholder="Help!"
          extraComponent={
            <button className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2">
              <MdSupportAgent className="text-xl" />
              <span className="text-md">Live Chat</span>
            </button>
          }
        />
        {/* </div> */}
      </nav>
    </header>
  );
});
