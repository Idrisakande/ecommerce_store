import { profileLinks } from "@/constants/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { MdLogout } from "react-icons/md";
import { Button } from "./widgets/Button";
import { RiProfileFill } from "react-icons/ri";
import Auth10 from "@/services/auth.service";

interface AccountLinkProps {}

export const AccountLink: FC<AccountLinkProps> = ({}) => {
  const [show, setShow] = useState<boolean>(false);
  const toggleAccount = useCallback(() => setShow((prev) => !prev), []);

  const router = useRouter();
  const currentRoute = router.pathname === "/" ? "/" : router.pathname;

  const handleLogOut = useCallback(() => {
    const authService = new Auth10(router);
    authService.handleLogout();
  }, []);

  return (
    <>
      <main className="hidden md:flex bg-white rounded-xl pt-4 pb-7 px-4 flex-col gap-1 w-full max-w-[30%] lg:max-w-[27%]">
        {profileLinks.map(({ name, href, icon }) => (
          <Link
            // onClick={() => setShow(false)}
            key={name}
            href={href}
            className={` ${
              currentRoute === href ? "bg-[#FFF9F2]" : "bg-white"
            } flex hover:bg-[#FFF9F2] rounded-md font-medium hover:font-semibold hover:scale-105 transition-all duration-500 text-sm text-[#0C0E3B] p-2 items-center gap-2`}
          >
            <span className="flex justify-end items-end ">{icon} </span>
            <span className="">{name}</span>
          </Link>
        ))}
        <div className="border-b mt-4 border-slate-300 w-full h-[2px]" />
        <Button
          primary
          onClick={handleLogOut}
          className="flex mt-2 hover:bg-[#FFF9F2] rounded-md hover:scale-105 transition-all duration-300 text-sm text-[#0C0E3B] p-2 justify-center items-center gap-2"
        >
          <MdLogout size={19} />
          <span>Log out</span>
        </Button>
      </main>

      {/* <div onClick={() => setShow(false)} className={`absolute inset-0 ${
            show
              ? "block opacity-20 transition duration-500"
              : "block opacity-0 transition duration-500"
          }`} > */}
      <button
        onClick={toggleAccount}
        className=" md:hidden absolute cursor-pointer top-5 right-5 text-afuna-blue flex justify-between items-center"
      >
        <RiProfileFill className="w-5 h-5 rounded-full" />
      </button>

      <div
        className={`md:hidden absolute z-10 top-12 left-[0.35rem] transition duration-500" flex-col w-fit gap-2  ${
          show
            ? "block translate-x-0 transition duration-500"
            : "block transform -translate-x-[6rem] transition duration-500"
        }`}
      >
        <main className="flex bg-white rounded-xl p-2 flex-col gap-1 w-full ">
          {profileLinks.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className={`${
                currentRoute === href ? "bg-[#FFF9F2]" : "bg-white"
              } flex justify-center hover:bg-[#FFF9F2] rounded-md font-medium hover:font-semibold hover:scale-105 transition-all duration-500 text-sm text-[#0C0E3B] p-2 items-center gap-2`}
            >
              <span className="">{icon} </span>
              <span className="sr-only">{name}</span>
            </Link>
          ))}
          <div className="border-b mt-2 border-slate-300 w-full h-[2px]" />
          <Button
            primary
            onClick={handleLogOut}
            className="flex mt-2 hover:bg-[#FFF9F2] rounded-md hover:scale-105 transition-all duration-300 text-sm text-[#0C0E3B] p-1 justify-center items-center gap-2"
          >
            <MdLogout />
            <span className="sr-only">Log out</span>
          </Button>
        </main>
      </div>
      {/* </div> */}
    </>
  );
};
