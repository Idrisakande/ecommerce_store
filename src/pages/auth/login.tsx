import Image from "next/image";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Joi from "joi";
import Head from "next/head";
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import images from "@/constants/images";
import AuthLayout from "@/layouts/auth";
import Auth10 from "@/services/auth.service";
import { T_login_data } from "@/types/auth.type";
import { RootState } from "@/types/store.type";
import { Input } from "@/components/widgets/Input";
import { LoadingStateContext } from "@/contexts/LoadingStateContextProvider";
import { T_loading_provider } from "@/types/loading";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/widgets/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Simplified email validation for example
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.pattern.base": "Password must be letters and numbers",
      "any.required": "Password is required",
    }),
}).required();

function Login() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);
  const [ishidden, setHidden] = useState(true);
  const router = useRouter();
  const opt = useContext(LoadingStateContext) as T_loading_provider;

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  //   return;
  // }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRememberMe(event.target.checked),
    []
  );
  const [show, setShow] = useState<boolean>(false);
  const toggleshowPassword = useCallback(() => setShow((prev) => !prev), []);
  const onSubmit = (
    data: FieldValue<{
      email: string;
      password: string;
    }>
  ) => {
    opt?.setIsloading && opt.setIsloading(true);
    if (!isValid) {
      toast.warn("Provide a valid credential", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    const authService = new Auth10(router);
    const credential = data as T_login_data;
    authService
      .handleLogin({ ...credential, rememberMe })
      .then((data) => {
        if (data === undefined) {
          toast.error(`Invalid credentials!.`);
        }
      })
      .finally(() => opt?.setIsloading && opt.setIsloading(false));
  };

  const handleGoogleLogin = useCallback(async () => {
    const authService = new Auth10(router);
    const { data } = await authService.googlesignin();
    const URL = data.googleLoginUrl;
    window.open(URL, "mozillaWindow", "left=200,top=200,width=520,height=320");
  }, []);

  const signUp = useCallback(() => router.push("register"), [router]);

  return (
    <AuthLayout>
      <>
        <Head>
          <title>Afruna :: User&apos;s Login</title>
          <meta http-equiv="X-UA-Compatible" content="IE=7" />
          <link
            rel="shortcut icon"
            href="../../assets/imgs/logo.svg"
            type="image/x-icon"
          />
        </Head>
        {/* &apos; */}
        <h1 className="relative w-fit mx-auto pt-8 pb-10 lg:pb-6 text-slate-900 text-2xl font-bold">
          User Log in
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className="max-w-[90%] sm:max-w-[28rem] lg:w-[35rem] flex flex-col items-center mx-auto rounded-2xl shadow-md p-6 sm:pt-8 lg:pt-12 sm:px-6 lg:px-16 bg-white border-[1px] text-xs gap-2"
        >
          <Input
            label="Your Email"
            id="email"
            type={"email"}
            placeholder="Enter email address"
            errors={errors}
            register={register}
            className=""
          />
          <Input
            label={`Password`}
            type={show ? "text" : "password"}
            placeholder={!show ? "*******" : "password"}
            id={`password`}
            register={register}
            errors={errors}
            extraComponent={
              <div onClick={toggleshowPassword}>
                {!show ? (
                  <FaEye className="mr-2 text-lg" />
                ) : (
                  <FaEyeSlash className="mr-2 text-lg" />
                )}
              </div>
            }
          />

          <fieldset className="flex justify-between items-center mt-2 w-full">
            <div className="flex justify-between items-center">
              <input
                onChange={handleRememberMe}
                checked={rememberMe}
                className="w-4 bg-black  h-4 focus-within:border-slate-400"
                type="checkbox"
                id="remember"
              />
              <label className="ml-2 text-xs font-semibold" htmlFor="remember">
                Remember me
              </label>
            </div>
            <button type="button" className="text-afruna-gold font-semibold">
              Forgot password?
            </button>
          </fieldset>
          <Button
            primary
            disabled={opt.isLoading}
            fullWidth
            className={`font-semibold rounded-md h-10 md:h-12 my-6`}
          >
            {opt.isLoading ? (
              <Loader2 className=" h-6 w-6 text-white animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>

          <div className="relative mb-4 w-full">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
                w-full
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
            <span className="ml-2">Log in with Google</span>
          </button>

          <div className="my-3 text-center">
            <p className="text-sm ">Don&apos;t have an account?</p>
            <button
              onClick={signUp}
              type="button"
              className="font-semibold mt-3 text-sm hover:text-afruna-gold transition duration-500 hover:underline"
            >
              Register
            </button>
          </div>
        </form>
      </>
    </AuthLayout>
  );
}

export default Login;
