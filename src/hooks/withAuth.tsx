import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ComponentType, FC } from "react";
import {
  TOriginalComponentProps,
  TResultComponentProps,
} from "@/types/auth.type";
import { RootState } from "@/types/store.type";
import { toast } from "react-toastify";
// import {isAuthenticated} from "@/lib/is_authenticated";

const withAuth10 = <P extends TOriginalComponentProps>(
  WrappedComponent: ComponentType<P>
): ComponentType<TResultComponentProps> => {
  const AuthComponent: FC<TResultComponentProps> = (props) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const { pathname } = router;

    /**
     * @Description: Redirect to login page when not logged in and
     *              path is among protected routes.
     *  @Type: Path redirect.
     * */
    if (!isAuthenticated && isProtectedRoute(pathname)) {
      router.replace("auth/login").finally(() => {
        toast.error("Kindly login");
      });
      return;
    }
    // if (!isAuthenticated() && isProtectedRoute(pathname)) {
    // 	router.replace("/auth/login");
    // 	return;
    // }

    // Render the wrapped component if the user is logged in
    return <WrappedComponent {...(props as P)} />;
  };

  return AuthComponent;
};

export default withAuth10;

const protectedRoutes = [
  "/profile",
  "/order",
  "/review",
  "/checkout",
  "/notification",
  "/contact",
  "/payment",
];

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.includes(pathname);
};
const UN_PROTECTED_PATH = [
  "/auth/login",
  "/auth/register",
  "/",
  "/product/:path*",
  "/wishlist",
  "/compare",
  "/faq",
];
const isPublicRoute = (pathname: string) => {
  return UN_PROTECTED_PATH.includes(pathname);
};
