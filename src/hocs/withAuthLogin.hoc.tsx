import { RootState } from "@/types/redux-store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ComponentType, FC } from "react";
import {
	TOriginalComponentProps,
	TResultComponentProps,
} from "@/types/auth.type";

const withAuthLogin = <P extends TOriginalComponentProps>(
	WrappedComponent: ComponentType<P>
): ComponentType<TResultComponentProps> => {
	const AuthComponent: FC<TResultComponentProps> = (props) => {
		const { isAuthenticated } = useSelector(
			(state: RootState) => state.auth
		);
		const router = useRouter();

		// If the user is not logged in, redirect to the login page
		if (!isAuthenticated) {
			router.push("auth/login");
			return <></>;
		} else if (isAuthenticated) {
			router.push("");
		}

		// Render the wrapped component if the user is logged in
		return <WrappedComponent {...(props as P)} />;
	};

	return AuthComponent;
};

export default withAuthLogin;
