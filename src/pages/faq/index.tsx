import { FC, useState } from "react";
import Main from "@/layouts/main";
import { MdAdd, MdRemove } from "react-icons/md";
import { useRouter } from "next/router";
export default function Index() {
  const [QAT, setQAT] = useState("Order Placement");
  const router = useRouter();
  return (
    <Main>
      <main className="bg-white text-afruna-blue">
        <header className="px-20 py-10">
          <h1 className="flex font-semibold mb-5 text-3xl uppercase">
            <span>Frequently ask</span>
            <span className="text-blue-400 ml-2">questions</span>
          </h1>
          {/* MAP NAVS INSTEAD  */}
          <ul className="flex space-x-8 text-md">
            {[
              "Order Placement",
              "Account Creation",
              "Delivery Timeline",
              "All Categories",
            ].map((li, idx) => (
              <li
                onClick={() => setQAT(li)}
                className={`cursor-pointer font-extrabold transition-all ease-in duration-300 hover:scale-95 hover:border-b hover:border-afruna-gold/70 ${
                  QAT === li && "border-b border-afruna-gold/70 scale-100"
                } `}
                key={idx}
              >
                {li}
              </li>
            ))}
          </ul>
        </header>

        {[
          {
            counter: 1,
            description:
              "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            title: "How do i open an account",
          },
          {
            counter: 2,
            description:
              "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            title: "How do i open an account",
          },
          {
            counter: 3,
            description:
              "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            title: "How do i open an account",
          },
          {
            counter: 4,
            description:
              "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            title: "How do i open an account",
          },
          {
            counter: 5,
            description:
              "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            title: "How do i open an account",
          },
        ].map(({ counter, description, title }, idx) => (
          <Accordion
            key={idx}
            counter={counter}
            description={description}
            title={title}
          />
        ))}
        <div className="bg-pink-300/30 w-[75%] md:w-[55%] mb-40 mx-auto flex border-[1px] items-center py-7 px-3  rounded-lg justify-around">
          <div>
            <h2 className=" font-bold text-xl">More questions?</h2>
            <p className="text-sm ml-2">
              We love to hear from you, so feel free to contact us
            </p>
          </div>
          <button
            onClick={() => router.push("contact")}
            className="bg-gradient-leftRightBlue rounded-md md:w-[150px] font-bold text-afruna-blue text-xs md:text-[14px] py-3 px-5"
          >
            Contact us
          </button>
        </div>
      </main>
    </Main>
  );
}

interface IAccordion {
  counter: number;
  description: string;
  title: string;
}

const Accordion: FC<IAccordion> = ({ counter, title, description }) => {
  const [answer, setAnswer] = useState(false);

  return (
    <ul
      className={`flex-col flex w-[75%] md:w-[55%] m-auto items-center ${
        answer &&
        "transition-all text-white bg-afruna-blue ease-out duration-1000"
      }`}
    >
      <li
        className={`w-full my-3 flex flex-col border-2 border-solid rounded-md ${
          answer ? "border-afruna-gold/20" : "border-afruna-blue/90"
        }`}
      >
        <div className="flex items-center font-black justify-between rounded-md gap-8">
          <h3 className="mx-5 text-xl">{counter}</h3>
          <h3 className="text-lg">{title}</h3>
          <button
            className={`${
              answer ? "bg-blue-400" : "bg-afruna-blue"
            } p-2 rounded-r-sm`}
            onClick={() => setAnswer((prev) => !prev)}
          >
            {answer ? (
              <MdRemove className={"text-3xl"} />
            ) : (
              <MdAdd className={"text-3xl"} />
            )}
          </button>
        </div>
      </li>
      <p
        className={`${
          answer
            ? "visible transition-all h-fit ease-linear text-white delay-300 duration-500 "
            : "hidden"
        } font-medium py-5 px-10 leading-7 text-justify text-sm ml-4 flex justify-center`}
      >
        {description}
      </p>
    </ul>
  );
};

// https://github.com/Jrcity/afruna-ecommerce.git