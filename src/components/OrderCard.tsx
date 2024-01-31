import Image from "next/image";
import { FC} from "react";
import { useRouter } from "next/router";
import { IoCheckmark } from "react-icons/io5";
import { T_order_item } from "@/types/user";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface OrderCardProps {
  item: T_order_item;
}
export const OrderCard: FC<OrderCardProps> = ({ item }) => {
  const { push } = useRouter();
  const formatedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  // console.log(item);
  

  return (
    <div className="border w-full rounded-md border-[#D5D5E6] px-2 sm:px-5 py-4 flex flex-col justify-start items-start gap-2 sm:gap-1 sm:flex-row">
      <div className="flex justify-start  sm:max-w-[60%] items-start gap-1 md:gap-3 w-full">
        <div className="p-2 flex justify-center items-center">
          <div className="w-[5rem] h-[5rem] md:w-[5remm] md:h-[5rem] overflow-hidden rounded-md relative">
            <Image src={verifyImageUrl(item.productId?.images[0])} alt={`product image`} fill />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="tracking-tight text-start md:max-w-[98%] leading-4 font-semibold text-[0.8rem] sm:text-[0.9rem] md:text-base sm:font-semibold text-[#1C1C1C]">
            {item.productId?.name}
          </h1>
          <span className="text-xs mt-1 md:mt-0 md:text-sm tracking-tight text-[#818181]">
            Order Id: {item._id
            // .substring(0, 15)
            }
          </span>
          <div className="flex gap-1 w-fit mt-2 text-xs md:text-sm justify-start items-center bg-[#E2FBE5] text-[#00B517] p-1">
            <IoCheckmark size={16} /> {item.deliveryStatus}
          </div>
          <span className="text-[#0C0E3B] font-semibold mt-2 md:mt-3 text-[0.7rem] md:text-[0.8rem]">
            {formatedDate(item.updatedAt)}
          </span>
        </div>
      </div>
      <div
        className={`flex justify-start items-center sm:justify-end sm:max-w-[40%] w-full px-3 mt-1 sm:mt-4 
  `}
      >
        <button
          onClick={() => push(`/review/${item.productId?._id}`)}
          className="text-[#FFC283] text-sm lg:text-base font-bold"
        >
          Rate and Review Item
        </button>
      </div>
    </div>
  );
};


const userOrder = [
  {
      "_id": "6525afacf473260473558ea0",
      "userId": "64fd44221abe577c800747e2",
      "total": 9000000,
      "createdAt": "2023-10-10T20:10:20.822Z",
      "updatedAt": "2023-10-10T20:10:20.822Z",
      "customId": "#8",
      "items": [
          {
              "_id": "6525afadf473260473558ea4",
              "vendorId": "64c122efaf8034cccd0b0783",
              "productId": null,
              "sessionId": "6525afacf473260473558ea0",
              "isPaid": false,
              "quantity": 4,
              "total": 9000000,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-10T20:10:21.124Z",
              "updatedAt": "2023-10-10T20:10:21.124Z",
              "customId": "#10",
              "__v": 0
          }
      ]
  },
  {
      "_id": "6525b44ff473260473558eee",
      "userId": "64fd44221abe577c800747e2",
      "total": 360.99,
      "createdAt": "2023-10-10T20:30:07.699Z",
      "updatedAt": "2023-10-10T20:30:07.699Z",
      "customId": "#9",
      "items": [
          {
              "_id": "6525b44ff473260473558ef2",
              "vendorId": "652515ce8bf9211849371d62",
              "productId": null,
              "sessionId": "6525b44ff473260473558eee",
              "isPaid": false,
              "quantity": 1,
              "total": 332.5,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-10T20:30:08.000Z",
              "updatedAt": "2023-10-10T20:30:08.000Z",
              "customId": "#11",
              "__v": 0
          },
          {
              "_id": "6525b450f473260473558ef6",
              "vendorId": "64caf1c9a520294555a6ac80",
              "productId": null,
              "sessionId": "6525b44ff473260473558eee",
              "isPaid": false,
              "quantity": 1,
              "total": 28.49,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-10T20:30:08.306Z",
              "updatedAt": "2023-10-10T20:30:08.306Z",
              "customId": "#12",
              "__v": 0
          }
      ]
  },
  {
      "_id": "6526cb974d98ec0bbf4136c3",
      "userId": "64fd44221abe577c800747e2",
      "total": 2587,
      "createdAt": "2023-10-11T16:21:43.557Z",
      "updatedAt": "2023-10-11T16:21:43.557Z",
      "customId": "#11",
      "items": [
          {
              "_id": "6526cb974d98ec0bbf4136c7",
              "vendorId": "64d6768f1ee22542de1af291",
              "productId": null,
              "sessionId": "6526cb974d98ec0bbf4136c3",
              "isPaid": false,
              "quantity": 2,
              "total": 1372,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-11T16:21:43.896Z",
              "updatedAt": "2023-10-11T16:21:43.896Z",
              "customId": "#14",
              "__v": 0
          },
          {
              "_id": "6526cb984d98ec0bbf4136cb",
              "vendorId": "652515ce8bf9211849371d62",
              "productId": null,
              "sessionId": "6526cb974d98ec0bbf4136c3",
              "isPaid": false,
              "quantity": 1,
              "total": 1215,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-11T16:21:44.223Z",
              "updatedAt": "2023-10-11T16:21:44.223Z",
              "customId": "#15",
              "__v": 0
          }
      ]
  },
  {
      "_id": "652842164d98ec0bbf418b6e",
      "userId": "64fd44221abe577c800747e2",
      "total": 2805,
      "createdAt": "2023-10-12T18:59:34.553Z",
      "updatedAt": "2023-10-12T18:59:34.553Z",
      "customId": "#12",
      "__v": 0,
      "items": [
          {
              "_id": "652842164d98ec0bbf418b72",
              "vendorId": "6528361b4d98ec0bbf4184b4",
              "productId": null,
              "sessionId": "652842164d98ec0bbf418b6e",
              "isPaid": false,
              "quantity": 1,
              "total": 225,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-12T18:59:34.913Z",
              "updatedAt": "2023-10-12T18:59:34.913Z",
              "customId": "#16",
          },
          {
              "_id": "652842174d98ec0bbf418b76",
              "vendorId": "650ae30d45bcaca137506660",
              "productId": null,
              "sessionId": "652842164d98ec0bbf418b6e",
              "isPaid": false,
              "quantity": 2,
              "total": 2580,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-12T18:59:35.263Z",
              "updatedAt": "2023-10-12T18:59:35.263Z",
              "customId": "#17",
          }
      ]
  },
  {
      "_id": "652919354d98ec0bbf42e6c9",
      "userId": "64fd44221abe577c800747e2",
      "total": 3530,
      "createdAt": "2023-10-13T10:17:25.514Z",
      "updatedAt": "2023-10-13T10:17:25.514Z",
      "customId": "#14",
      "items": [
          {
              "_id": "652919354d98ec0bbf42e6cd",
              "vendorId": "6528361b4d98ec0bbf4184b4",
              "productId": null,
              "sessionId": "652919354d98ec0bbf42e6c9",
              "isPaid": false,
              "quantity": 2,
              "total": 950,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-13T10:17:25.809Z",
              "updatedAt": "2023-10-13T10:17:25.809Z",
              "customId": "#19",
          },
          {
              "_id": "652919364d98ec0bbf42e6d1",
              "vendorId": "650ae30d45bcaca137506660",
              "productId": null,
              "sessionId": "652919354d98ec0bbf42e6c9",
              "isPaid": false,
              "quantity": 2,
              "total": 2580,
              "deliveryStatus": "Pending",
              "isCanceled": false,
              "options": [],
              "createdAt": "2023-10-13T10:17:26.107Z",
              "updatedAt": "2023-10-13T10:17:26.107Z",
              "customId": "#20",
          }
      ]
  }
]

'In the above userOrder array informations, I want to check into all the object and get all items of the array. And you must see that each items array contains an object. I want to get all the object inside each items because each item is an order of a particular product. So I want to get all the 9 object and put them in an array so then map through them to render each product object order. so generate a correct lines of code, Please'