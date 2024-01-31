import Head from "next/head";
import Image from "next/image";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  CountryIso2,
  PhoneInput,
  usePhoneValidation,
} from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";

import images from "@/constants/images";
import AuthLayout from "@/layouts/auth";
import getCountryUtil from "@/utils/get-country.util";
import Auth10 from "@/services/auth.service";
import { T_register_data } from "@/types/auth.type";
import { Input } from "@/components/widgets/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { Loader2 } from "lucide-react";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { Button } from "@/components/widgets/Button";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label("Email") // Simplified email validation for example
    .required()
    .messages({
      "string.base": "Email is required!",
      "string.email": "Invalid email format",
      "any.only": "Email is required!",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .min(8)
    .max(30)
    .label("Password")
    .required()
    .messages({
      "string.pattern.base":
        "{{#label}} should only contain letters and numbers",
    }),
  firstName: Joi.string().trim().label("First Name").required().messages({
    "any.only": "{{#label}} is required!",
  }),
  lastName: Joi.string().trim().label("Last Name").required().messages({
    "any.only": "{{#label}} is required!",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({
      "any.only": "{{#label}} does not match the password",
    }),
}).required();

export default function Register() {
  const [agreed, setAgreed] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmdPasswordHidden, setConfirmdPasswordHidden] = useState(true);
  const [phone, setPhone] = useState("");
  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  }); //returns as {Name: "Nigeria", Code: "NG"}
  const validation = usePhoneValidation(phone);
  const isPhoneValid = validation.isValid;
  const localeRef = useRef<HTMLSpanElement>(null);
  const phoneValidationRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    return;
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleshowPassword = useCallback(() => setShowPassword((prev) => !prev), []);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);
  const toggleshowConfirmedPassword = useCallback(() => setShowConfirmedPassword((prev) => !prev), []);
  const onSubmit = useCallback(
    (
      data: FieldValue<{
        email: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
        password: string;
      }>
    ) => {
      if (!isPhoneValid) {
        phoneValidationRef.current
          ? (phoneValidationRef.current.textContent =
              "Phone Number is not provided!")
          : "";
      }
      if (country.Name === "") {
        localeRef.current
          ? (localeRef.current.textContent = "Country is required!")
          : "";
      }
      if (!isValid || !isPhoneValid || country.Name === "") {
        return;
      }
      const user_data = {
        ...(data as unknown as T_register_data),
        country: country.Name,
        phoneNumber: phone,
      };
      const authService = new Auth10(router);
      authService.handleSignup(user_data)
    },
    [isValid, isPhoneValid, phoneValidationRef.current, phone, country.Name]
  );
  const handleAgreed: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setAgreed(event.target.checked),
    []
  );

  // console.log(isPhoneValid, currentCountry, "country:", country);

  const handleCountrySelection = useCallback((value: string) => {
    let country = getCountryUtil(value);
    setCountry(country);
  }, []);
  const handleGoogleLogin = useCallback(async () => {
    const authService = new Auth10(router);
    const { data } = await authService.googlesignin();
    const URL = data.googleLoginUrl;
    window.open(URL, "mozillaWindow", "left=200,top=500,width=520,height=320");
  }, []);

  const signIn = useCallback(() => router.push("login"), [router]);

  return (
    <AuthLayout>
      <>
        <Head>
          <title>Afruna :: User&apos;s Registeration</title>
          <meta http-equiv="X-UA-Compatible" content="IE=7" />
          <link
            rel="shortcut icon"
            href="../../assets/imgs/logo.svg"
            type="image/x-icon"
          />
        </Head>
        {/* &apos; */}
        <h1 className="relative w-fit mx-auto pt-8 pb-10 lg:pb-6 text-slate-900 text-2xl font-bold">
          User Registeration
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className="max-w-[90%] sm:max-w-[28rem] md:max-w-[45rem] lg:max-w-[50rem] flex flex-col items-center mx-auto rounded-2xl shadow-md p-6 sm:pt-8 md:p-10 sm:px-6 lg:p-14  bg-white border-[1px] text-xs gap-2"
        >
          <section className="w-full flex flex-col gap-2 lg:gap-4">
            <aside className="flex flex-col gap-2 md:gap-5 md:flex-row">
              <Input
                label="First Name"
                id="firstName"
                type={"text"}
                placeholder="Jon"
                errors={errors}
                register={register}
                className=""
              />
              <Input
                label="Last Name"
                id="lastName"
                type={"text"}
                placeholder="Don"
                errors={errors}
                register={register}
                className=""
              />
            </aside>

            <aside className="flex flex-col gap-2 md:gap-5 md:flex-row">
              <Input
                label="Your Email"
                id="email"
                type={"email"}
                placeholder="don@gmail.com"
                errors={errors}
                register={register}
                className=""
              />
              <fieldset className="flex flex-col w-full">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Phone Number
                </label>
                {
                  <PhoneInput
                    defaultCountry="ng"
                    inputStyle={{
                      border: "none",
                      width: "100%",
                      padding: "0.5rem",
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
                    charAfterDialCode="-"
                    placeholder="phone number"
                    className="flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                   font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                   transition duration-300 sm:text-sm sm:leading-6"
                  />
                }
                {!isPhoneValid && (
                  <span
                    ref={phoneValidationRef}
                    className="text-red-500 block bg-white rounded-sm w-fit p-1"
                  ></span>
                )}
              </fieldset>
            </aside>
            <aside className="flex flex-col gap-1 md:gap-5 md:flex-row">
              <fieldset className="w-full">
                <label
                  htmlFor="country"
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Country of Residence
                </label>
                <ReactFlagsSelect
                  id="country"
                  searchable
                  onSelect={handleCountrySelection}
                  selected={country.Code}
                  // customLabels={}
                  selectButtonClassName="py-3"
                  className="myCustomFlagsSelect mb-0 mt-1 "
                  // border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  // font-medium  rounded-md placeholder:text-gray-400 focus-visible:shadow-md
                  // transition duration-300 sm:text-sm sm:leading-6
                />
                {/* {country.Name === "" && (
                  <span
                    ref={localeRef}
                    className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
                  ></span>
                )} */}
              </fieldset>
              <Input
                label={`Password`}
                type={showPassword ? "text" : "password"}
                placeholder={!showPassword ? "*******" : "password"}
                id={`password`}
                register={register}
                errors={errors}
                extraComponent={
                  <div onClick={toggleshowPassword}>
                    {!showPassword ? (
                      <FaEye className="mr-2 text-lg" />
                    ) : (
                      <FaEyeSlash className="mr-2 text-lg" />
                    )}
                  </div>
                }
              />
            </aside>

            <aside className="flex flex-col gap-2 md:flex-row">
              <Input
                label={`Confirm Password`}
                type={showConfirmedPassword ? "text" : "password"}
                placeholder={!showConfirmedPassword ? "*******" : "password"}
                id={`confirmPassword`}
                register={register}
                errors={errors}
                extraComponent={
                  <div onClick={toggleshowConfirmedPassword}>
                    {!showPassword ? (
                      <FaEye className="mr-2 text-lg" />
                    ) : (
                      <FaEyeSlash className="mr-2 text-lg" />
                    )}
                  </div>
                }
              />
            </aside>
          </section>

          <section className="w-full text-xs md:text-sm md:w-1/2 mx-auto mt-6">
            <fieldset className="flex justify-center items-center w-full mb-2">
              <input
                onChange={handleAgreed}
                className="w-4 h-4 focus-within:border-slate-400"
                type="checkbox"
                id="agreed"
              />
              <label className="ml-2 text-xs font-medium" htmlFor="agreed">
                I agree to the
              </label>
              <span className="underline hover:cursor-pointer capitalize mx-1 font-semibold text-xs hover:text-afruna-gold transition duration-500 hover:underline">
                Terms
              </span>
              <span>&</span>
              <span className="underline hover:cursor-pointer capitalize mx-1 font-semibold text-xs hover:text-afruna-gold transition duration-500 hover:underline">
                Conditions
              </span>
            </fieldset>
            <Button
              // !agreed && "cursor-not-allowed"
              primary
              fullWidth
              disabled={!agreed && opt.isLoading}
              className={`h-10 md:h-12 font-semibold text-white rounded-md my-6 w-full`}
            >
              {opt.isLoading ? (
                <Loader2 className=" h-6 w-6 text-black animate-spin" />
              ) : (
                "Sign up"
              )}
            </Button>

            <div className="relative mb-6">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[80%] mx-auto border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue to
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="h-11 hover:scale-95 duration-500 transition-transform text-slate-700 text-xs font-semibold justify-center items-center w-full rounded-md my-1 flex border-[1px] border-slate-300"
            >
              <Image
                src={images.google_icon}
                alt="google_icon"
                priority
                className="w-5"
              />
              <span className="ml-2">Sign up with Google</span>
            </button>
            <div className="flex flex-col gap-3 mt-4 md:mt-6 justify-center items-center text-center">
              <p className="text-sm ">Already have an account?</p>
              <button
                onClick={signIn}
                type="button"
                className="font-semibold text-sm hover:text-afruna-gold transition duration-500 hover:underline"
              >
                Login
              </button>
            </div>
          </section>
        </form>
      </>
    </AuthLayout>
  );
}
