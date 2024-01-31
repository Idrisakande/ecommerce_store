import Productdetailscard from "@/components/Productdetailscard";
import { useRouter } from "next/router";

export default function () {
  const { query } = useRouter();
  console.log(query);
  const _id = query.id as string;
  console.log("Dynamic product ID:", _id || "(No ID provided)");

  return (
    <>
      {" "}
      <Productdetailscard id={_id} />{" "}
    </>
  );
}
