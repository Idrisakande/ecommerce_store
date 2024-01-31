import { T_review_of_single_product } from "@/types/review";
import Image from "next/image";
import { FC } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import images from "@/constants/images";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface ReviewCardProps {
  item: T_review_of_single_product;
}

export const ReviewCard: FC<ReviewCardProps> = ({ item }) => {
  const formatedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className=" max-w-[20.75rem] w-full lg:max-w-[25rem] sm:col-span-1"
      key={item._id}
    >
      <div className="flex gap-4 justify-start items-center">
        {item && item.userId ? (
          <div className="h-[4rem] w-[4rem] lg:w-[5rem] lg:h-[5rem] rounded-full overflow-hidden relative">
            <Image
              src={verifyImageUrl(item.userId.avatar) ?? images.review}
              alt={`${item.userId.firstName} image`}
              fill
            />
          </div>
        ) : null}
        <div className="text-[#1C1C1C] flex flex-col gap-1">
          <h2 className="font-semibold tracking-normal text-sm lg:text-base">
            {item &&
              `${item.userId.firstName} ${item.userId.lastName}`}
          </h2>
          <div className="flex gap-1">
            {Array(5)
              .fill("_")
              .map((star, index) => (
                <div
                  className={`${
                    index < item.rating
                      ? "text-[#FF9E3A]"
                      : "text-slate-500"
                  }  text-xs`}
                  key={index}
                >
                  {index < item.rating ? (
                    index === Math.floor(item.rating) &&
                    item.rating % 1 !== 0 ? (
                      <BsStarHalf />
                    ) : (
                      <BsStarFill />
                    )
                  ) : (
                    <BsStar />
                  )}
                </div>
              ))}
          </div>
          <span className="font-semibold text-[0.83rem] lg:text-[0.95rem] text-[#1C1C1C]/90">
            {formatedDate(item.updatedAt)}
          </span>
        </div>
      </div>

      <p className="text-[#000000] font-medium text-[14px] lg:text-base mt-1 lg:mt-4">
        {item.comment}
      </p>
    </div>
  );
};
