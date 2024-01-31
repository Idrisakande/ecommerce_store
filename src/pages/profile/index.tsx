/* eslint-disable react/display-name */
import { Button } from "@/components/widgets/Button";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import React, {
  ChangeEventHandler,
  ReactNode,
  Ref,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AccountLink } from "@/components/AccountLink";
import Image from "next/image";
import { NewsLetter } from "@/components/NewsLetter";
import Main from "@/layouts/main";
import { ExtFile, FileInputButton } from "@files-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import imags from "@/constants/images";
import UsersActions from "@/services/user.services";
import { Input } from "@/components/widgets/Input";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  CountryIso2,
  PhoneInput,
  usePhoneValidation,
} from "react-international-phone";
import "react-international-phone/style.css";
import { FaEye, FaEyeSlash, FaPen } from "react-icons/fa";
import ReactFlagsSelect from "react-flags-select";
import getCountryUtil, { getCountryCode } from "@/utils/get-country.util";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import withAuth10 from "@/hooks/withAuth";
import { verifyImageUrl } from "@/utils/verify_image_url";
import { usePathname } from "next/navigation";

interface SecurityValues {
  oldPassword: string;
  newPassword: string;
}
// interface BioDataValues {
//   firstName: string;
//   lastName: string;
//   email: string;
// }
// // interface ContactDataValues {
// //   : string;
// //   newPassword: string;
// // }

export default withAuth10( function Index() {
  
  const pathname = usePathname()
  console.log(pathname);
  const { currentActiveUsersData, isActive } = useSelector(
    (state: RootState) => state.users
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const { isLoading, setIsloading } = useContext(
    LoadingStateContext
  ) as T_loading_provider;

  const handlePhotoChange = useCallback(async (files: ExtFile[]) => {
    const userServies = new UsersActions();
    const formdata = new FormData();
    formdata.append("avatar", files[0].file as Blob);
    userServies.updateMe(formdata, {
      setIsloading: setIsloading,
    });
  }, []);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  useMemo(() => {
    if (currentActiveUsersData && isActive) {
      const { firstName, lastName, email, country, phoneNumber } =
        currentActiveUsersData;
      if (firstName) {
        setFirstname(firstName);
      }
      if (lastName) {
        setLastname(lastName);
      }
      if (email) {
        setMail(email);
      }
    }
  }, [currentActiveUsersData, isActive, setValue]);

  const handleBioDataUpdate = useCallback(
    (data: FieldValue<{ lastName: string; email: string }>) => {
      const userServices = new UsersActions();
      const entries = Object.entries(data as {});
      const formdata = new FormData();
      for (let i in entries as {}) {
        const [key, value] = entries[i as unknown as number];
        if (value && key !== "oldPassword" && key !== "password") {
          // Exclude the country field here if needed
          if (key !== "country") {
            formdata.append(key, value as any);
          }
        }
      }
      function isFormDataEmpty(data: FormData): boolean {
        const keysArray = Array.from(data.keys());
        for (const key of keysArray) {
          return false; // If there's at least one key, it's not empty
        }
        return true; // If no keys are found, it's empty
      }
      if (!isFormDataEmpty(formdata)) {
        // If there's data in the FormData, make the update
        // console.log(formdata);

        userServices.updateMe(formdata, {
          setIsloading: setIsloading,
        });
      }
    },
    []
  );

  // To Update contact info
  const [phone, setPhone] = useState("");
  const validation = usePhoneValidation(phone);
  const isPhoneValid = validation.isValid;
  const countryRef = useRef<HTMLSpanElement>(null);
  const phoneValidationRef = useRef<HTMLSpanElement>(null);
  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  });
  const handleCountrySelection = useCallback((value: string) => {
    let country = getCountryUtil(value);
    setCountry(country);
  }, []);
  const countryCode = useMemo(() => {
    if (currentActiveUsersData) {
      const code = getCountryCode(currentActiveUsersData.country);
      return code && code.Code
    }
    return "";
  }, [currentActiveUsersData]);
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const inputAdress1Ref = useRef<HTMLInputElement | null>(null);
  const inputAdress2Ref = useRef<HTMLInputElement | null>(null);

  const handleAdress1Change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setAddress1(event.target.value),
    []
  );
  const handleAdress2Change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setAddress2(event.target.value),
    []
  );
  const handleContactInfoUpdate = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const userServices = new UsersActions();
      if (!isPhoneValid) {
        if (phoneValidationRef.current) {
          phoneValidationRef.current.textContent = "Phone number isn't valid!";
        }
        return;
      }
      if (country.Name === "" && countryCode === '') {
        if (countryRef.current) {
          countryRef.current.textContent = "Country is required";
        }
        return;
      }
      const formdata = new FormData();
      // Add the updated values to FormData
      formdata.append("phoneNumber", currentActiveUsersData?.phoneNumber || phone);
      formdata.append("country", currentActiveUsersData?.country || country.Name);
      // if (address1 === "") {
      //   return address1 === undefined
      // }
      formdata.append("address1", address1);
      // if (address2 === "") {
      //   return address2 === undefined
      // }
      formdata.append("address2", address2);
      // Create an contactInfo object with the required properties
      const contactInfo = {
        phoneNumber: formdata.get("phoneNumber") as string,
        country: formdata.get("country") as string,
        address1: formdata.get("address1") as string | null,
        address2: formdata.get("address2") as string | null,
      };
      // console.log(contactInfo);
      userServices
        .updateMe(contactInfo, {
          setIsloading: setIsloading,
        })
        .then((data) => {
          if (data && data.success === true) {
            // console.log(data.data);
            
            toast.success(`Contact update successfully`);
            // setValue("oldPassword", "");
            // setValue("password", "");
          } else {
            toast.error("Invalid current password");
          }
        });
    },
    [phone, country, address1, address2]
  );

  // To Update password
  const [oldPasswordHidden, setOldPasswordHidden] = useState(true);
  const [newPasswordHidden, setNewPasswordHidden] = useState(true);
  // const oldPassword = watch('oldPassword');
  const handleUpdatePasswordChange = useCallback(
    (data: FieldValue<{ password: string; oldPassword: string }>) => {
      const entries = Object.entries(data as {});
      const formdata = new FormData();
      for (let i in entries as {}) {
        const [key, value] = entries[i as unknown as number];
        formdata.append(key, value as any);
      }
      // Create an object with the required properties
      const passwordData = {
        oldPassword: formdata.get("oldPassword") as string,
        password: formdata.get("password") as string,
      };
      // Check if there is no oldPassword
      if (!passwordData.oldPassword) {
        setError("oldPassword", {
          type: "manual",
          message: "Current password is required.",
        });
        return;
      }
      // Check if there is no password
      if (!passwordData.password) {
        setError("password", {
          type: "manual",
          message: "New password is required.",
        });
        return;
      }
      setIsloading && setIsloading(true);
      const userServices = new UsersActions();
      userServices
        .updatePassword(passwordData, {
          setIsloading: setIsloading,
        })
        .then((data) => {
          if (data && data.success === true) {
            setValue("oldPassword", "");
            setValue("password", "");
          } else {
            toast.error("Invalid current password");
          }
        });
    },
    []
  );

  return (
    <Main>
      <main className="pt-4 sm:pt-6 bg-[#F2F5F7] h-full relative">
        <div className="w-full md:flex justify-center items-start pb-10 md:pb-16 lg:pb-20 gap-5 px-4 sm:px-10 md:px-12 lg:px-28">
          <AccountLink />
          <div className="flex flex-col gap-4 grow md:max-w-[70%] lg:max-w-[73%] mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-[#0C0E3B]">
              My Profile
            </h3>
            {/* shrink-0   first:rounded-tl-md last:rounded-tr-md  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black*/}

            {/* shadow-[0_2px_10px] shadow-black/5 */}
            <Accordion.Root
              className="w-full flex flex-col gap-4 lg:gap-6 rounded-xl"
              type="single"
              defaultValue="item-1"
              collapsible
            >
              <AccordionItem
                value="item-1"
                className="border border-[#D5D5E6] rounded-lg bg-white px-4 sm:px-7"
              >
                <div
                  className={
                    "flex w-full justify-between items-start py-6 sm:py-8"
                  }
                >
                  <div className="flex lg:pl-4 lg:pt-4 gap-2 sm:gap-3 justify-center items-end">
                    <div className="w-[4.5rem] h-[4.5rem] sm:w-[5rem] sm:h-[5rem] lg:w-[7.5rem] lg:h-[7.5rem] shadow rounded-full overflow-hidden relative flex justify-center items-center bg-blue-950">
                    {currentActiveUsersData?.avatar ? (
                      <Image
                        src={verifyImageUrl(currentActiveUsersData.avatar)}
                        alt="your image"
                        priority
                        fill
                        // className="w-[9re object-contain"
                      />
                    ) : (
                      <div className="text-sm sm:text-base text-white font-light">
                        {currentActiveUsersData?.firstName
                          .charAt(0)
                          .toLocaleUpperCase()}
                      </div>
                    )}
                    </div>
                    
                    <div className="flex flex-col justify-end items-start gap-1">
                      <h4 className="font-semibold text-[0.9rem] lg:text-lg text-start p-2 leading-3">
                        {currentActiveUsersData &&
                          `${
                            currentActiveUsersData.firstName
                              .charAt(0)
                              .toUpperCase() +
                            currentActiveUsersData.firstName.slice(1)
                          } ${
                            currentActiveUsersData.lastName
                              .charAt(0)
                              .toUpperCase() +
                            currentActiveUsersData.lastName.slice(1)
                          }`}
                      </h4>
                      <FileInputButton
                        className=" py-2 max-w-[10rem] w-full text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 rounded"
                        placeholder=""
                        disabled={isLoading}
                        maxFiles={1}
                        onChange={handlePhotoChange}
                      >
                        {isLoading ? (
                          <Loader2 className=" h-4 w-4 lg:h-5 lg:w-5 text-white animate-spin" />
                        ) : (
                          <>
                            <span className="capitalize font-semibold text-xs sm:text-sm lg:text-base">
                              Upload
                            </span>
                            <span className="lowercase font-semibold px-1 text-xs sm:text-sm lg:text-base">
                              {" "}
                              a{" "}
                            </span>
                            <span className="capitalize font-semibold text-xs sm:text-sm lg:text-base">
                              Photo
                            </span>
                          </>
                        )}
                      </FileInputButton>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <AccordionTrigger
                      className={
                        "flex text-afruna-blue hover:text-[#FFC283] transition duration-500 justify-end items-center w-full"
                      }
                    >
                      <span className="hidden sm:block lg:hidden font-semibold text-sm md:text-base">
                        Info
                      </span>
                      <span className=" hidden lg:flex md:font-semibold md:text-base">
                        See Info
                      </span>
                    </AccordionTrigger>
                  </div>
                </div>

                <AccordionContent
                  className={"mt-6 lg:max-w-[90%] mx-auto w-full"}
                >
                  <div className="w-full h-[1px] lg:flex border border-[#D1D1D1]" />
                  <form
                    onSubmit={handleSubmit(handleBioDataUpdate)}
                    className="w-full lg:pl-4 mt-4 lg:mt-8 pb-10 lg:pb-12 flex gap-2 lg:gap-5 flex-col lg:max-w-[90%]"
                  >
                    <div className="flex gap-2 lg:gap-x-8 flex-col w-full lg:flex-row">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"firstName"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {`First Name`}
                        </label>
                        <div
                          className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
                        >
                          <input
                            id={"firstName"}
                            type={"text"}
                            autoComplete={"firstName"}
                            value={firstname}
                            onChange={() => {}}
                            className="w-full bg-transparent px-2 py-[0.4rem] sm:py-2"
                          />
                        </div>
                      </fieldset>
                      <fieldset className="w-full">
                        <label
                          htmlFor={"lastName"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {`Last Name`}
                        </label>
                        <div
                          className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
                        >
                          <input
                            id={"lastName"}
                            type={"text"}
                            autoComplete={"lastName"}
                            value={lastname}
                            onChange={() => {}}
                            className="w-full bg-transparent px-2 py-[0.4rem] sm:py-2"
                          />
                        </div>
                      </fieldset>
                    </div>
                    <fieldset className="w-full lg:max-w-[47.4%]">
                      <label
                        htmlFor={"email"}
                        className="text-sm font-semibold text-[#232F3E] leading-6"
                      >
                        {`Email address`}
                      </label>
                      <div
                        className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
                      >
                        <input
                          id={"email"}
                          type={"email"}
                          autoComplete={"email"}
                          value={mail}
                          onChange={() => {}}
                          className="w-full bg-transparent px-2 py-[0.4rem] sm:py-2"
                        />
                      </div>
                    </fieldset>
                    {/* <div className="flex mt-4 mb-6 sm:mb-8 lg:mb-10 justify-center lg:justify-end lg:mt-8 items-center">
                      <Button className="border rounded-md border-[#FF9E3A] hover:scale-90 duration-500 transition-all">
                        Update Information
                      </Button>
                    </div> */}
                  </form>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-[#D5D5E6] rounded-lg bg-white px-4 sm:px-7"
              >
                <div
                  className={
                    "flex w-full justify-between gap-2 items-center py-4 sm:py-6"
                  }
                >
                  <div className="flex lg:pl-4  gap-3 justify-center items-center">
                    <h2 className="font-semibold text-base lg:text-xl">
                      Contact Information
                    </h2>
                  </div>
                  <div className="flex justify-end items-center">
                    <AccordionTrigger
                      className={
                        "flex text-afruna-blue hover:text-[#FFC283] transition duration-500 justify-end items-center w-full"
                      }
                    >
                      <span className="hidden sm:block lg:hidden font-semibold text-sm md:text-base">
                        Info
                      </span>
                      <span className=" hidden lg:flex md:font-semibold md:text-base">
                        See Info
                      </span>
                    </AccordionTrigger>
                  </div>
                </div>

                <AccordionContent
                  className={"lg:mt-8 mt-2 lg:max-w-[90%] mx-auto w-full"}
                >
                  <div className="w-full h-[1px] lg:flex border border-[#D1D1D1]" />
                  <form
                    onSubmit={handleContactInfoUpdate}
                    className="w-full lg:pl-4 mt-4 lg:mt-8 flex gap-3 lg:gap-5 flex-col lg:max-w-[90%]"
                  >
                    <div className="flex gap-2 flex-col lg:gap-x-8 w-full lg:flex-row">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"phoneNumber"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          Phone Number
                        </label>
                        {/* <div
                          className={`mt-1 flex justify-center items-center gap-2`}
                        > */}
                        <PhoneInput
                          defaultCountry="ng"
                          inputStyle={{
                            border: "none",
                            width: "100%",
                            padding: "0.5rem",
                            // paddingRight: '1rem',
                            // marginRight: '1rem',
                          }}
                          onChange={(ph, iso) => {
                            setPhone(ph);
                            setCurrentCountry(iso);
                          }}
                          countrySelectorStyleProps={{
                            buttonStyle: {
                              border: "none",
                              marginLeft: "0.7rem",
                              marginTop: "0.21rem",
                              marginBottom: "0.21rem",
                            },
                          }}
                          value={
                            phone.length
                              ? phone
                              : currentActiveUsersData?.phoneNumber
                          }
                          charAfterDialCode="-"
                          placeholder="phone number"
                          className="flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full
                         font-semibold text-xs text-gray-400 rounded-md placeholder:text-gray-300 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6"
                        />
                        {!isPhoneValid && (
                          <span
                            ref={phoneValidationRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit pl-1"
                          ></span>
                        )}
                      </fieldset>

                      <fieldset className="w-full">
                        <label
                          htmlFor={"country"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          Country of Resident
                        </label>
                        <ReactFlagsSelect
                          id="country"
                          searchable
                          showSelectedLabel
                          // placeholder={
                          //   <span className="text-sm lg:pt-[0.2rem] lg:pb-[0.2rem] font-semibold text-gray-600 ">
                          //     {currentActiveUsersData?.country
                          //       ? currentActiveUsersData?.country
                          //       : "Your country"}
                          //   </span>
                          // }
                          onSelect={handleCountrySelection}
                          // selected={country.Code}
                          selected={
                          country.Name  
                          }
                          selectButtonClassName=""
                          className=" mb-0 mt-1 text-xs font-semibold text-gray-6s00"
                        />
                        {country.Name === "" && (
                          <span
                            ref={countryRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit pl-1"
                          ></span>
                        )}
                      </fieldset>
                    </div>

                    {/* <div className="flex gap-2 lg:gap-x-8 flex-col w-full lg:flex-row">
                      <fieldset className="w-full">
                        <label
                          htmlFor={"address1"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Address 1"}
                        </label>
                        <div
                          className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  font-semibold text-gray-600 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 sm:text-sm sm:leading-6 
                  `}
                          // ${disabled && "opacity-50 cursor-default"}
                        >
                          <input
                            id={"address1"}
                            type={"text"}
                            placeholder={" Enter your address"}
                            ref={inputAdress1Ref}
                            value={address1}
                            onChange={handleAdress1Change}
                            autoComplete={"address1"}
                            // disabled={disabled}
                            // {...register('address1', { required: true  })}
                            className="w-full bg-transparent px-2 py-2"
                          />
                          {
                            <div
                              onClick={() => inputAdress1Ref.current?.focus()}
                              className="cursor-pointer w-[3rem] flex justify-center items-center"
                            >
                              <FaPen className="text-sm text-slate-500" />
                            </div>
                          }
                        </div>
                        {errors["address1"] && (
                          <span className="text-rose-500 block mt-1 bg-red-100 rounded-sm w-fit p-1">
                            {errors["address1"]?.message as ReactNode}
                          </span>
                        )}
                      </fieldset>

                      <fieldset className="w-full">
                        <label
                          htmlFor={"address2"}
                          className="text-sm font-semibold text-[#232F3E] leading-6"
                        >
                          {"Address 2"}
                        </label>
                        <div
                          className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-600 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                  `}
                          // ${disabled && "opacity-50 cursor-default"}
                        >
                          <input
                            id={"address2"}
                            type={"text"}
                            placeholder={" Enter your address2"}
                            ref={inputAdress2Ref}
                            value={address2}
                            onChange={handleAdress2Change}
                            autoComplete={"address2"}
                            // disabled={disabled}
                            // {...register('address1', { required: true  })}
                            className="w-full bg-transparent px-2 py-2"
                          />
                          {
                            <div
                              onClick={() => inputAdress2Ref.current?.focus()}
                              className="cursor-pointer w-[3rem] flex justify-center items-center"
                            >
                              <FaPen className="text-sm text-slate-500" />
                            </div>
                          }
                        </div>
                        {errors["address2"] && (
                          <span className="text-rose-500 block mt-1 bg-red-100 rounded-sm w-fit p-1">
                            {errors["address2"]?.message as ReactNode}
                          </span>
                        )}
                      </fieldset>
                    </div> */}

                    <div className="flex mt-4 mb-6 sm:mb-8 lg:mb-10 justify-center lg:justify-end lg:mt-8 items-center">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className={`${
                          !isLoading ? "hover:scale-95" : ""
                        } border rounded-md border-[#FF9E3A]  duration-500 transition-all max-w-[11.3rem] w-full`}
                      >
                        {isLoading ? "Updating..." : "Update Contact"}
                      </Button>
                    </div>
                  </form>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-[#D5D5E6] rounded-lg bg-white px-4 sm:px-7"
              >
                <div
                  className={
                    "flex w-full justify-between gap-2 items-center py-4 sm:py-6"
                  }
                >
                  <div className="flex lg:pl-4  gap-3 justify-center items-center">
                    <h2 className="font-semibold text-base lg:text-xl">
                      Security Update
                    </h2>
                  </div>
                  <div className="flex justify-end items-center">
                    <AccordionTrigger
                      className={
                        "flex text-afruna-blue hover:text-[#FFC283] transition duration-500 justify-end items-center w-full"
                      }
                    >
                      <span className="hidden sm:block lg:hidden font-semibold text-sm md:text-base">
                        Info
                      </span>
                      <span className=" hidden lg:flex md:font-semibold md:text-base">
                        Revise Info
                      </span>
                    </AccordionTrigger>
                  </div>
                </div>

                <AccordionContent
                  className={"lg:mt-8 mt-2 lg:max-w-[90%] mx-auto w-full"}
                >
                  <div className="w-full h-[1px] lg:flex border border-[#D1D1D1]" />
                  <form
                    onSubmit={handleSubmit(handleUpdatePasswordChange)}
                    className="w-full lg:pl-4 mt-4 lg:mt-8 flex gap-3 lg:gap-5 flex-col lg:max-w-[90%]"
                  >
                    <div className="flex gap-2 lg:gap-x-8 flex-col w-full lg:flex-row">
                      <Input
                        label={`Current Password`}
                        type={oldPasswordHidden ? "text" : "password"}
                        placeholder={oldPasswordHidden ? "*******" : "password"}
                        id={`oldPassword`}
                        register={register}
                        errors={errors}
                        extraComponent={
                          <div
                            onClick={() =>
                              setOldPasswordHidden((prev) => !prev)
                            }
                          >
                            {oldPasswordHidden ? (
                              <FaEye className="mr-2 text-lg" />
                            ) : (
                              <FaEyeSlash className="mr-2 text-lg" />
                            )}
                          </div>
                        }
                      />
                      <Input
                        label={`New Password`}
                        type={newPasswordHidden ? "text" : "password"}
                        placeholder={newPasswordHidden ? "*******" : "password"}
                        id={`password`}
                        register={register}
                        errors={errors}
                        extraComponent={
                          <div
                            onClick={() =>
                              setNewPasswordHidden((prev) => !prev)
                            }
                          >
                            {newPasswordHidden ? (
                              <FaEye className="mr-2 text-lg" />
                            ) : (
                              <FaEyeSlash className="mr-2 text-lg" />
                            )}
                          </div>
                        }
                      />
                    </div>
                    <div className="flex mt-4 mb-6 sm:mb-8 lg:mb-10 justify-center lg:justify-end lg:mt-8 items-center">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className={`${
                          !isLoading ? "hover:scale-95" : ""
                        } border rounded-md border-[#FF9E3A]  duration-500 transition-all max-w-[11.3rem] w-full`}
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          </div>
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </main>
    </Main>
  );
})

const AccordionItem = React.forwardRef(
  (props: Accordion.AccordionItemProps, forwardedRef: Ref<HTMLDivElement>) => (
    //  focus-within:shadow-[0_0_0_2px]
    <Accordion.Item
      className={classNames(
        " mt-px overflow-hidden first:mt-0  focus-within:relative focus-within:z-10",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      {props.children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  (
    props: Accordion.AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header className="flex justify-center items-center w-full">
      <Accordion.Trigger
        className={classNames(
          "group flex cursor-pointer gap-1 items-center justify-center leading-none outline-none",
          props.className
        )}
        {...props}
        ref={forwardedRef}
      >
        {props.children}
        <ChevronDownIcon
          className=" w-6 h-6 sm:mr-4 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    props: Accordion.AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={classNames(
        "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden",
        props.className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="">{props.children}</div>
    </Accordion.Content>
  )
);

{
  /* <Input
label="First Name"
id="firstName"
placeholder=""
errors={errors}
register={register}
className=""
/> 

*/
}
