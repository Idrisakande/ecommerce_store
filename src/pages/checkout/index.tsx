import { Button } from "@/components/widgets/Button";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdHouse } from "react-icons/md";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IoCheckmark } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { PickupDestination } from "@/components/PickupDestination";
import ItemPicker from "@/components/ItemPicker";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { handleErrors } from "@/utils/errors.util";
import { T_error_response } from "@/types/auth.type";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import UsersActions from "@/services/user.services";
import { LoadingPage } from "@/components/LoadingPage";
import { toast } from "react-toastify";
import { CartContext } from "@/contexts/CartContextProvider";
import { T_cart_context } from "@/types/cart.type";
import withAuth10 from "@/hooks/withAuth";
import Link from "next/link";

export default withAuth10(function Index() {
  const opt = useContext(LoadingStateContext) as T_loading_provider;
  const { myData } = useSelector((state: RootState) => state.users);
  const [saveAddress, setSaveAddress] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [streetName, setStreetName] = useState<string>("");
  const [fLOA, setFLOA] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [shippingMethod, setshippingMethod] = useState<string>();
  const [isModelOpen, setModelOpen] = useState<boolean>(false);
  const streetRef = useRef<HTMLInputElement | null>(null);
  const postcodeRef = useRef<HTMLInputElement | null>(null);
  const floaRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { cartData, getCartData } = useContext(CartContext) as T_cart_context;
  // const [orderData, setOrderData] = useState<{
  //   createdAt: string;
  //   customId: string;
  //   total: number;
  //   updatedAt: string;
  //   userId: string;
  //   __v: 0;
  //   _id: string;
  // }>();
  useEffect(() => {
    getCartData();
  }, []);
  const Total = cartData?.total.toFixed(2) as unknown as number;

  useEffect(() => {
    const userService = new UsersActions();
    userService.getMyData(opt);
    if (myData && myData.addresses.length > 0) {
      setSaveAddress(myData.addresses);
    }
  }, []);

  const router = useRouter();

  const handleSelectedAddressChange = (address: string) => {
    // Split the address by spaces to get an array of words
    const addressParts = address.split(" ");
    if (addressParts.length >= 1) {
      // Set the 'First line of address' input to the first word
      setFLOA(addressParts[0]);
    }
    if (addressParts.length > 1) {
      // Check if the second word starts with punctuation
      if (/^[!@#$%^&*(),.?":{}|<>]/.test(addressParts[1].charAt(0))) {
        // Remove the punctuation and set the rest as 'Street name'
        setStreetName(addressParts.slice(1).join(" ").substring(1));
      } else {
        // Set the second word and the rest as 'Street name'
        setStreetName(addressParts.slice(1).join(" "));
      }
    }
  };

  const handleCheckout = async (payload: {
    address: string;
    postCode: string;
  }) => {
    try {
      const { data } = await axios.post(`/api/orders/checkout`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      getCartData(); //update cart

      return data;
    } catch (error) {
      toast.error("Checkout failed");
      handleErrors(error as AxiosError<T_error_response>);
    }finally{
      setLoading(false);
    }
  };

  const handleSubmitForm = () => {
    if (fLOA === "") {
      if (floaRef.current) {
        floaRef.current.textContent = "Enter your first line of address";
      }
      return;
    }
    if (streetName === "") {
      if (streetRef.current) {
        streetRef.current.textContent = "Enter your street name";
      }
      return;
    }
    if (state === "") {
      if (stateRef.current) {
        stateRef.current.textContent = "Enter your state";
      }
      return;
    }
    if (country === "") {
      if (countryRef.current) {
        countryRef.current.textContent = "Enter your country";
      }
      return;
    }
    if (postcode === "") {
      if (postcodeRef.current) {
        postcodeRef.current.textContent = "Enter your Postcode";
      }
      return;
    }
    // else {
    //   if (postcode.length > 5){
    //       toast.warn('Postcode must not be greater than 5')
    //       return
    //   }
    // }
    const form = {
      address: `${fLOA}, ${streetName}`,
      postCode: postcode,
      state: state,
      country: country,
    };
    // console.log(form);
    // submit the form
    setLoading(true);
    handleCheckout(form).then( async (orderData) => {
      console.log("order orderData", orderData);

      if (orderData.success === true) {
        toast.success("Checkout successful, please wait for payment link.");
        try {
            const { data } = await axios.post(
              "/api/transactions",
              { orderId: orderData.data._id },
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            );
  
            if (data.success === true) {
              // Assuming you have the authorization URL in a variable, let's call it 'authorizationURL'
              const full_link =
                data.data.authorization_url;
              // Open a new browser window
              const paymentWindow = window.open(full_link, "_blank");
  
              // If you want to open it in a pop-up instead, you can customize the window features
              // For example:
              // const paymentWindow = window.open(authorizationURL, 'Payment Pop-up', 'width=600,height=400');
  
              // Check if the window was successfully opened
              if (paymentWindow) {
                // Window opened successfully
                // Add an event listener to detect when the popup window is closed
                window.addEventListener("beforeunload", () => {
                  // This event is triggered when the popup is closed
                  router.push("/")
                });
              } else {
              
                // Handle if the window couldn't be opened (e.g., due to pop-up blockers)
                // toast.error("Failed to open payment window");
              }
            } else {
              // toast.error("Failed to get the payment link");
            }
        } catch (error) {
          toast.error("Failed to get the payment link");
        }
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  

  if (opt.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Main>
      <main className="pt-4 md:pt-6 bg-[#F2F5F7]">
        <div className="px-4 md:px-16 lg:px-28">
          <h2 className="mb-2 sm:text-xl md:text-2xl w-full grow sm:max-w-[90%] md:max-w-full mx-auto font-semibold text-[#1C1C1C] md:mb-6">
            Check out
          </h2>
          {cartData && cartData.items.length > 0 ? (
            <>
              <div className="flex gap-8 md:gap-4 w-full pb-10 md:pb-24 flex-col md:flex-row justify-center items-start ">
                <div className="bg-[#F7FAFC] w-full grow sm:max-w-[90%] mx-auto rounded-lg px-5 sm:px-10 sm:py-12 lg:px-28 py-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 sm:gap-6 relative mb-5 justify-between w-full items-center">
                      <span className="text-sm lg:text-xl font-semibold text-blue-500">
                        Shipping
                      </span>
                      <div className="flex mx-auto grow justify-between w-full items-center">
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
                    <h3 className="font-semibold lg:text-[1.13rem] text-gray-950 leading-6">
                      Delivery method
                    </h3>

                    <form>
                      <RadioGroup.Root
                        className="flex flex-col gap-2.5"
                        defaultValue="default"
                        aria-label="View density"
                      >
                        <div className="flex gap-2 rounded-md justify-start items-center bg-white p-3">
                          <RadioGroup.Item
                            className="bg-white border border-slate-400 w-[20px] h-[20px] rounded-full focus:bg-[#0C0E3B] outline-none cursor-pointer"
                            value="default"
                            id="r1"
                          >
                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-white" />
                          </RadioGroup.Item>
                          <div className="flex gap-1 rounded-md justify-center items-center text-[#0C0E3B]">
                            <FaTruckArrowRight size={15} />
                            <span className="text-xs">Home delivery</span>
                          </div>
                        </div>
                        <div className="flex gap-2 rounded-md justify-start items-center bg-white p-3">
                          <RadioGroup.Item
                            onClick={() => setModelOpen(true)}
                            className="bg-white border border-slate-400 w-[20px] h-[20px] rounded-full focus:bg-[#0C0E3B] outline-none cursor-pointer"
                            value="default"
                            id="r2"
                          >
                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-white" />
                          </RadioGroup.Item>
                          <PickupDestination
                            isOpen={isModelOpen}
                            onClose={() => setModelOpen(false)}
                          />
                          <div className="flex gap-1 rounded-md justify-center items-center text-[#0C0E3B]">
                            <MdHouse size={15} />
                            <span className="text-xs">Pick up</span>
                          </div>
                        </div>
                      </RadioGroup.Root>
                    </form>
                  </div>
                  <form className="flex flex-col gap-5 mt-8">
                    <h2 className="font-semibold lg:text-[1.13rem] text-gray-950 leading-6">
                      Shipping Address
                    </h2>
                    <div className="flex flex-col md:flex-row min-w-full justify-between items-center w-full">
                      <p className="text-[#232F3E] w-full text-sm md:max-w-[40%]">
                        Use saved address
                      </p>
                      <fieldset className="flex w-full flex-col gap-1 md:gap-2">
                        <ItemPicker
                          items={
                            saveAddress.length > 0
                              ? saveAddress
                              : //  ["12 , Osogbo street", "56 Living spring street"]
                                ["No address is found"]
                          }
                          placeholder={"123, Bipasha basu crescent"}
                          getSelected={
                            (value) => setSelectedAddress(value as string)
                            // setSelectedAddress(value as string)
                          }
                          triggerClassName="p-[8px] md:py-[12px] rounded-md"
                        />
                      </fieldset>
                    </div>
                    <div className="flex gap-8">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"fLOA"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"First line of address"}
                        </label>
                        <div
                          className={`mt-1 flex justify-center items-center gap-2`}
                        >
                          <input
                            id={"fLOA"}
                            type={"text"}
                            placeholder={"123"}
                            autoComplete={"fLOA"}
                            value={fLOA}
                            ref={floaRef}
                            onChange={(e) => setFLOA(e.target.value)}
                            className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          `}
                          />
                        </div>
                        {fLOA === "" && (
                          <span
                            ref={floaRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                          ></span>
                        )}
                      </fieldset>
                      <fieldset className="w-full">
                        <label
                          htmlFor={"streetName"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Street name"}
                        </label>
                        <div
                          className={`mt-1 flex justify-center items-center gap-2 `}
                        >
                          <input
                            id={"streetName"}
                            type={"text"}
                            placeholder={"Bipashabasu cresent"}
                            autoComplete={"streetName"}
                            value={streetName}
                            ref={streetRef}
                            onChange={(e) => setStreetName(e.target.value)}
                            className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          `}
                          />
                        </div>
                        {streetName === "" && (
                          <span
                            ref={streetRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                          ></span>
                        )}
                      </fieldset>
                    </div>
                    <div className="flex gap-8">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"state"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Your state"}
                        </label>
                        <div
                          className={`mt-1 flex justify-center items-center gap-2 `}
                        >
                          <input
                            id={"state"}
                            type={"text"}
                            placeholder={"Enter your state"}
                            autoComplete={"state"}
                            value={state}
                            ref={stateRef}
                            onChange={(e) => setState(e.target.value)}
                            className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          `}
                          />
                        </div>
                        {state === "" && (
                          <span
                            ref={stateRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                          ></span>
                        )}
                      </fieldset>
                      <fieldset className="w-full">
                        <label
                          htmlFor={"country"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Your country"}
                        </label>
                        <div
                          className={`mt-1 flex justify-center items-center gap-2 `}
                        >
                          <input
                            id={"country"}
                            type={"text"}
                            placeholder={"Enter your country"}
                            autoComplete={"country"}
                            value={country}
                            ref={countryRef}
                            onChange={(e) => setCountry(e.target.value)}
                            className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          `}
                          />
                        </div>
                        {country === "" && (
                          <span
                            ref={countryRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                          ></span>
                        )}
                      </fieldset>
                    </div>

                    <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"postcode"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Postcode"}
                        </label>
                        <div
                          className={`mt-1 flex justify-center items-center gap-2 `}
                        >
                          <input
                            id={"postcode"}
                            type={"text"}
                            placeholder={"45657"}
                            autoComplete={"postcode"}
                            value={postcode}
                            ref={postcodeRef}
                            onChange={(e) => setPostcode(e.target.value)}
                            className={`form-input w-full text-sm
           font-medium px-2 md:px-3 py-2 md:py-[0.7rem] rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          `}
                          />
                        </div>
                        {postcode === "" && (
                          <span
                            ref={postcodeRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
                          ></span>
                        )}
                      </fieldset>
                      <fieldset className="w-full">
                        <label
                          htmlFor={"shipping method"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          Shipping method
                        </label>
                        <ItemPicker
                          getSelected={(val) =>
                            setshippingMethod(val as string)
                          }
                          items={[
                            "Free delivery",
                            "Fast delivery",
                            "Urgent delivery",
                          ]}
                          placeholder="Free shipping"
                          contentClassName={"p-2 bg-white text-sm"}
                          triggerClassName="flex text-sm mt-[0.4rem] space-x-2 place-items-center p-[8px] md:p-[12px] rounded-md"
                        />
                      </fieldset>
                    </div>
                  </form>
                  <div className="flex flex-col lg:flex-row mt-12 sm:max-w-[75%] md:max-w-[100%] mx-auto justify-between items-center">
                    <Button className="hover:scale-95 hover:text-orange-400 transition duration-300">
                      Cancel order
                    </Button>
                    <Button
                      primary
                      fullWidth
                      disabled={
                        cartData && cartData.items.length === 0 ? true : false
                      }
                      onClick={() => handleSubmitForm()}
                      className={` max-w-[8.5rem] sm:max-w-[10rem] md:max-w-[12rem] py-3 lg:py-4 rounded-md ${
                        cartData && cartData.items.length === 0
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {loading ? "Loading" : "Proceed!"}
                    </Button>
                  </div>
                </div>

                {/* check out */}
                <div className="bg-[#F7FAFC] rounded-lg mx-auto max-w-[23rem] w-full md:max-w-[35%] lg:max-w-[30%] p-4 flex flex-col gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-sm lg:text-base tracking-tight text-[#505050]">
                      Have a coupon?
                    </h4>
                    <form className="max-w-[27rem] mx-auto mt-1 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
                      <input
                        type="text"
                        placeholder="Add coupon"
                        disabled={true}
                        className="w-full px-2 py-1 tracking-tight bg-white h-full placeholder:text-[#D3D3D3]"
                      />
                      {/* <div className="ring-2 ring-blue-800 w-fit"> */}
                      <button
                        title="Comming feature"
                        className="px-4 py-2 tracking-tight text-white bg-gradient-topBottomBlue"
                      >
                        Apply
                      </button>
                      {/* </div> */}
                    </form>
                  </div>

                  <div className="bg-white rounded-lg p-4 pb-6 flex flex-col gap-3">
                    <div className="flex justify-between pt-4 items-center">
                      <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                        Subtotal:
                      </span>
                      <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                        {`#${Total}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="w-fit text-smlg:text-base tracking-tight text-[#505050]">
                        Discount:
                      </span>
                      <span className="w-fit lg:text-base text-sm tracking-tight text-[#FA3434]">
                        -$60.07
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="w-fit lg:text-base text-sm tracking-tight text-[#505050]">
                        Tax:
                      </span>
                      <span className="w-fit lg:text-base text-sm tracking-tight text-[#00B517]">
                        +$14.90
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="w-fit lg:text-base text-sm tracking-tight text-[#505050]">
                        Shipping:
                      </span>
                      <span className="w-fit lg:text-base text-sm tracking-tight text-[#00B517]">
                        Free
                      </span>
                    </div>
                    <div className="border-b border-slate-300 h-[1px] w-full" />
                    <div className="flex justify-between mt-3 items-center">
                      <span className="w-fit font-semibold tracking-tight">
                        Total:
                      </span>
                      <span className="w-fit font-semibold lg:text-xl tracking-tight">
                        {`#${Total}`}
                      </span>
                    </div>
                    <Button
                      onClick={() => router.push("/cart")}
                      className="mt-4 text-base hover:text-orange-500 hover:scale-95 transition duration-300 max-w-[12rem] mx-auto rounded-md"
                    >
                      Modify cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>Nothing available for checkout in the cart!</>
          )}
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
});
