import { Button } from "@/components/widgets/Button";
import { Input } from "@/components/widgets/Input";
import { useForm } from "react-hook-form";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdHouse } from "react-icons/md";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IoCheckmark } from "react-icons/io5";
import Image from "next/image";
import images from "@/constants/images";
import Link from "next/link";
import { useRouter } from "next/router";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  return (
    <Main>
      <main className="pt-10 bg-[#F2F5F7]">
        <div className="px-5 md:px-16 lg:px-28">
          <h2 className="mb-4 text-xl font-semibold text-[#1C1C1C] pl-7 md:mb-6">
            Payment
          </h2>

          <div className="flex gap-8 md:gap-4 w-full pb-10 md:pb-12 flex-col md:flex-row justify-center items-start ">
            <div className="bg-[#F7FAFC] sm:max-w-[78%] lg:min-w-[45rem] mx-auto rounded-lg px-5 sm:px-10 sm:py-12 lg:px-28 py-8">
              <div className="flex flex-col gap-3">
                <div className="flex relative mb-5 justify-between w-full items-center">
                  <span className="text-sm lg:text-xl  font-semibold text-blue-500">
                    Shipping
                  </span>
                  <div className="flex max-w-[40%] md:max-w-[60%] mx-auto  justify-between w-full items-center">
                    <div className="w-[1.3rem] h-[1.3rem] flex justify-center items-center p-1 rounded-full bg-black text-white">
                      <IoCheckmark size={30} />
                    </div>
                    <div className="border-b border-blue-500 w-full " />
                    <div className="w-[1.3rem] h-[1.3rem] flex justify-center items-center p-1 rounded-full bg-black text-white">
                      <IoCheckmark size={30} />
                    </div>
                  </div>
                  <span className="text-sm lg:text-xl font-semibold">
                    Payment
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:my-6">
                <div className="flex justify-center items-center bg-white drop-shadow p-3">
                  <p className="text-sm text-slate-400 font-medium max-w-[25%] w-full">
                    Contact
                  </p>
                  <span className="text-sm font-medium max-w-[60%] w-full">
                    suleimansyd@gmail.com
                  </span>
                  <button className="text-xs font-semibold text-blue-500 w-full max-w-[15%]">
                    Change
                  </button>
                </div>
                <div className="flex justify-center items-center bg-white drop-shadow p-3">
                  <p className="text-sm text-slate-400 font-medium max-w-[25%] w-full">
                    Ship to
                  </p>
                  <span className="text-sm font-medium max-w-[60%] w-full">
                    123, Bipasha basu cresent
                  </span>
                  <button className="text-xs font-semibold text-blue-500 w-full max-w-[15%]">
                    Change
                  </button>
                </div>
                <div className="flex justify-center items-center bg-white drop-shadow p-3">
                  <p className="text-sm text-slate-400 font-medium max-w-[25%] w-full">
                    Delivery
                  </p>
                  <span className="text-sm font-medium max-w-[60%] w-full">
                    Home delivery
                  </span>
                  <button className="text-xs font-semibold text-blue-500 w-full max-w-[15%]">
                    Change
                  </button>
                </div>
              </div>
              <form className="flex flex-col max-w-full gap-5 mt-8">
                <div>
                  <h2 className="text-sm font-semibold lg:text-[1.13rem] text-gray-950 leading-6">
                    Payment
                  </h2>
                  <p className="text-sm mt-1">
                    All transaction are secure and encrypted
                  </p>
                </div>
                <RadioGroup.Root
                  className="flex flex-col gap-2.5"
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div className="flex gap-2 rounded-md justify-start items-center bg-white p-3">
                    <RadioGroup.Item
                      className="bg-white border border-slate-400 w-[20px] h-[20px] rounded-full focus:bg-[#0C0E3B] outline-none cursor-default"
                      value="default"
                      id="r1"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-white" />
                    </RadioGroup.Item>
                    <div className="flex justify-between items-center w-full text-[#0C0E3B]">
                      <span className="text-xs font-semibold">Credit card</span>
                      <div className="flex justify-end gap-1 mt-2 items-center">
                        <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                          <Image
                            src={images.visa}
                            alt="image"
                            className="w-[95%]"
                          />
                        </div>
                        <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                          <Image
                            src={images.palmpay}
                            alt="image"
                            className="w-[0.8rem] h-[0.75rem]"
                          />
                        </div>
                        <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                          <Image
                            src={images.opay}
                            alt="image"
                            className="w-[98%]"
                          />
                        </div>
                        <div className="border w-[2rem] h-[1.4rem] flex justify-center items-center border-slate-200">
                          <Image
                            src={images.AfrunaPay}
                            alt="image"
                            className="w-[98%]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup.Root>
                <div className="md:pl-4 md:pr-4 flex flex-col gap-4">
                  <Input
                    label="Card number"
                    id="cardNumber"
                    type="text"
                    placeholder="4568-2453-"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    label="Name on card"
                    id="cardName"
                    type="text"
                    placeholder="Enter the name on your ATM card"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col md:pl-4 md:pr-4 w-full md:flex-row md:gap-4 justify-between items-center">
                  <Input
                    label="Expiration date"
                    id="exipreDate"
                    type="text"
                    placeholder="MM/YY"
                    register={register}
                    errors={errors}
                    className=""
                  />
                  {/* <ItemPicker
            items={["Shoes", "Ties"]}
            headerTitle="Category"
            placeholder="Select categories"
            key={"Items"}
            getSelected={(val) => // console.log(val)}
          /> */}
                  <Input
                    label="CV"
                    id="cv"
                    type="text"
                    placeholder="123"
                    register={register}
                    errors={errors}
                    className=""
                  />
                </div>
                <RadioGroup.Root
                  className="flex flex-col gap-2.5"
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div className="flex gap-2 rounded-md justify-start items-center bg-white p-3">
                    <RadioGroup.Item
                      className="bg-white border border-slate-400 w-[20px] h-[20px] rounded-full focus:bg-[#0C0E3B] outline-none cursor-default"
                      value="default"
                      id="r1"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-white" />
                    </RadioGroup.Item>
                    <span className="text-xs font-semibold">
                      Pay on delivery
                    </span>
                  </div>
                </RadioGroup.Root>
                <div className="flex mt-6 justify-between items-center">
                  <Button className="hover:scale-95 pl-0 transition duration-300">
                    Return to shipping
                  </Button>
                  <Button
                    primary
                    fullWidth
                    className="max-w-[8.5rem] md:max-w-[12rem] py-4 hover:scale-95 transition duration-300 rounded-md"
                  >
                    Pay now
                  </Button>
                </div>
              </form>
            </div>
            {/* Modify cart */}
            <div className="bg-[#F7FAFC] lg:p-6 rounded-lg md:max-w-[35%] lg:max-w-[30%] p-4 flex flex-col gap-6 mx-auto max-w-[23rem] w-full">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-sm lg:text-base tracking-tight text-[#505050]">
                  Have a coupon?
                </h4>
                <form className="max-w-[27rem] mx-auto mt-1 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Add coupon"
                    className="w-full px-2 py-1 tracking-tight bg-white h-full placeholder:text-[#D3D3D3]"
                  />
                  {/* <div className="ring-2 ring-blue-800 w-fit"> */}
                  <button className="px-4 py-2 tracking-tight text-white bg-gradient-topBottomBlue">
                    Apply
                  </button>
                  {/* </div> */}
                </form>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 flex pb-6 flex-col gap-3">
                <div className="flex justify-between pt-3 items-center">
                  <span className="w-fit text-sm lg:text-base  tracking-tight text-[#505050]">
                    Subtotal:
                  </span>
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                    $1403.97
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                    Discount:
                  </span>
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#FA3434]">
                    -$60.07
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                    Tax:
                  </span>
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#00B517]">
                    +$14.90
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                    Shipping:
                  </span>
                  <span className="w-fit text-sm lg:text-base tracking-tight text-[#00B517]">
                    Free
                  </span>
                </div>
                <div className="border-b border-slate-300 h-[1px] w-full" />
                <div className="flex justify-between mt-3 items-center">
                  <span className="w-fit font-semibold tracking-tight">
                    Total:
                  </span>
                  <span className="w-fit text-xl font-semibold tracking-tight">
                    $1463.97
                  </span>
                </div>
                <Button
                  onClick={() => router.push("/cart")}
                  className="mt-4 text-base  hover:scale-95 transition duration-300 max-w-[12rem] mx-auto rounded-md"
                >
                  Modify Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white lg:ml-32 mb-20 max-w-[35rem] pl-2 py-4 flex gap-6 justify-start items-center">
          <Link href={"/"} className="text-[0.8rem] text-blue-500">
            Refund Policy
          </Link>
          <Link href={"/"} className="text-[0.8rem] text-blue-500">
            Shipping Policy
          </Link>
          <Link href={"/"} className="text-[0.8rem] text-blue-500">
            Pivacy Policy
          </Link>
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
}
