import imags from "@/constants/images";
import Image from "next/image";
import { FC } from "react";

interface LoadingPageProps {}

export const LoadingPage: FC<LoadingPageProps> = ({}) => {
  return (
    <section>
      <div id="pageloader">
        <div id="loader" />
      </div>
      <div id="page_heartbeat_box">
        <Image src={imags.afruna_logo} alt="logo" id="heartbeat" />
      </div>
    </section>
  );
};
