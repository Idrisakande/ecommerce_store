import images from "@/constants/images";
import { BsFillHeartFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { IoColorPalette, IoNotifications } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import {
  MdHealthAndSafety,
  MdOutlineRateReview,
  MdSupportAgent,
} from "react-icons/md";
import { ItrendingItems, ItrendingNav } from "@/interfaces/data.interface";
import { FaPlusSquare, FaTshirt } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { LuDumbbell } from "react-icons/lu";
import teddybear from "@/assets/icons/mdi_kids-room.svg";

export const navLink = [
  {
    title: "Fashion",
    href: "/",
  },
  {
    title: "Furniture",
    href: "/",
  },
  {
    title: "Electronics",
    href: "/",
  },
  {
    title: "Services",
    href: "/",
  },
];

export const helpsLinks = [
  {
    name: "FAQs",
    href: "/faq",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Live Chat",
    href: "/chat",
    icon: <MdSupportAgent />,
  },
];

export const categoryLink = [
  {
    name: "Art & craft",
    href: "/product",
    img: IoColorPalette,
  },
  {
    name: "Fashion & wears",
    href: "/product",
    img: FaTshirt,
  },
  {
    name: "Computer & Accessories",
    href: "/product",
    img: RiComputerFill,
  },
  {
    name: "Phones & Tablets",
    href: "/product",
    img: GiSmartphone,
  },
  {
    name: "Sports & outdoors",
    href: "/product",
    img: LuDumbbell,
  },
  {
    name: "Health & Beauty",
    href: "/product",
    img: MdHealthAndSafety,
  },
  {
    name: "Kiddles Products",
    href: "/product",
    img: teddybear,
  },
  {
    name: "More categories ",
    href: "/product",
    img: FaPlusSquare,
  },
];

export const bannarContent = [
  {
    title: "Best of African's",
    category: "Arts & Craft",
    buttonColor: "bg-afruna-blue text-white",
    divStyle: "bannar1",
  },
  {
    title: "Affordable & dependable",
    category: "Kictenware",
    buttonColor: "bg-orange-400 text-black",
    divStyle: "bannar2",
  },
  {
    title: "Elegants & Stylish",
    category: "Wardrobe",
    buttonColor: "bg-afruna-blue text-white",
    divStyle: "bannar3",
  },
  {
    title: "Latest trending",
    category: "Electronic items",
    buttonColor: "bg-afruna-blue text-white",
    divStyle: "bannar2",
  },
  {
    title: "Latest Fashion",
    category: "Electronic items",
    buttonColor: "bg-afruna-blue text-white",
    divStyle: "bannar5",
  },
  {
    title: "Save big Groceries",
    category: "Grocery Super Deals",
    buttonColor: "bg-afruna-blue text-white",
    divStyle: "bannar6",
  },
];

export const afrunaHypeContent = [
  {
    id: 1,
    img: images.product11,
    name: "Wedding Beads",
  },
  {
    id: 2,
    img: images.product8,
    name: "Female footware",
  },
  {
    id: 3,
    img: images.product2,
    name: "Galola qawn",
  },
  {
    id: 4,
    img: images.product10,
    name: "Camera",
  },
  {
    id: 5,
    img: images.product9,
    name: "Burka cap",
  },
  {
    id: 6,
    img: images.product20,
    name: "Smart watches",
  },
  {
    id: 7,
    img: images.product12,
    name: "Camera",
  },
  // {
  // 	id: 8,
  // 	img: images.product11,
  // 	name: "Wedding Beads",
  // },
  // {
  // 	id: 9,
  // 	img: images.product8,
  // 	name: "Female footware",
  // },
  // {
  // 	id: 10,
  // 	img: images.product2,
  // 	name: "Galola qawn",
  // },
  // {
  //   id: 11,
  //   img: images.product10,
  //   name: "Camera",
  // },
  // {
  //   id: 12,
  //   img: images.product9,
  //   name: "Burka cap",
  // },
  // {
  //   id: 13,
  //   img: images.product20,
  //   name: "Smart watches",
  // },
  // {
  //   id: 14,
  //   img: images.product12,
  //   name: "Camera",
  // },
];

// trending nav
export const trendingNav = [
  {
    name: "All",
  },
  {
    name: "Fashion",
  },
  {
    name: "Art & Craft",
  },
  {
    name: "Kitchen",
  },
  {
    name: "Books",
  },
];

// trending item
export const trendingItems: ItrendingItems[] = [
  {
    id: "2",
    category: "Art & Craft",
    type: "Women's wares",
    img: images.product20,
    title: "Wedding Beads",
    price: 145,
    normalPrice: 150,
    rate: 4,
    size: "medium",
    color: "blue",
    inStock: false,
  },
  {
    id: "3",
    category: "Kitchen",
    type: "Men's wares",
    img: images.product16,
    title: "Tyre Rhyme",
    discount: 25,
    price: 200,
    normalPrice: 300,
    rate: 3,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "4",
    category: "Books",
    type: "Men's wares",
    img: images.product18,
    title: "Tyre Rhyme",
    discount: 10,
    price: 250,
    normalPrice: 300,
    rate: 4,
    size: "medium",
    color: "blue",
    inStock: false,
  },
  {
    id: "5",
    category: "Art & Craft",
    type: "Men's wares",
    img: images.product2,
    title: "Tyre Rhyme",
    discount: 15,
    price: 102,
    normalPrice: 360,
    rate: 2,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "6",
    category: "Kitchen",
    type: "Men's wares",
    img: images.product17,
    title: "Tyre Rhyme",
    discount: 13,
    price: 200,
    normalPrice: 300,
    rate: 3,
    size: "medium",
    color: "blue",
    inStock: false,
  },
  {
    id: "7",
    category: "Fashion",
    type: "Men's wares",
    img: images.product15,
    discount: 2,
    title: "Topa Pot",
    price: 102,
    normalPrice: 150,
    rate: 2,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "8",
    category: "Art & Craft",
    type: "Uni-sex",
    img: images.product19,
    title: "Wedding Beads",
    discount: 10,
    price: 145,
    normalPrice: 150,
    rate: 4,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "9",
    category: "Kitchen",
    type: "Uni-sex",
    img: images.product14,
    title: "Tyre Rhyme",
    price: 200,
    normalPrice: 300,
    rate: 5,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "10",
    category: "Books",
    type: "Men's wares",
    img: images.product18,
    title: "Tyre Rhyme",
    discount: 28,
    price: 250,
    normalPrice: 300,
    rate: 2,
    size: "medium",
    color: "blue",
    inStock: false,
  },
  {
    id: "11",
    category: "Fashion",
    type: "Men's wares",
    img: images.product24,
    title: "Car Wheel",
    price: 270,
    normalPrice: 300,
    rate: 4,
    size: "medium",
    color: "blue",
    inStock: true,
  },
  {
    id: "12",
    category: "Fashion",
    type: "Men's wares",
    img: images.product2,
    title: "Topa Pot",
    discount: 30,
    price: 102,
    normalPrice: 150,
    rate: 5,
    size: "medium",
    color: "blue",
    inStock: true,
  },
];

// frequent nav
export const frequentNav = [
  {
    name: "All",
  },
  {
    name: "Clothes",
  },
  {
    name: "Art & Craft",
  },
  {
    name: "Kitchen",
  },
  {
    name: "Books",
  },
];

// start items
export const startItems = [
  {
    id: "6",
    category: "Clothes",
    img: images.product21,
    title: "Tyre Rhyme",
    discount: 70,
    price: 102,
    normalPrice: 360,
    rate: 3,
  },
];

// movies items
export const moviesNav = [
  {
    name: "All",
  },
  {
    name: "Comedy",
  },
  {
    name: "Romance",
  },
  {
    name: "Crime",
  },
  {
    name: "Documentory",
  },
];

// movies items
export const moviesItems = [
  {
    id: 1,
    img: images.movie1,
  },
  {
    id: 2,
    img: images.movie2,
  },
  {
    id: 3,
    img: images.movie3,
  },
  {
    id: 4,
    img: images.movie4,
  },
  {
    id: 5,
    img: images.movie5,
  },
];
// books items
export const booksNav = [
  {
    name: "All",
  },
  {
    name: "Africa Literature",
  },
  {
    name: "Biography",
  },
  {
    name: "Mystery",
  },
  {
    name: "Novel",
  },
];

// books items
export const booksItems: ItrendingItems[] = [
  {
    id: "1",
    category: "African Literature",
    img: images.book1,
    title: "The incorruptible Judge",
    discount: 10,
    price: 102,
    normalPrice: 150,
    rate: 4,
  },
  {
    id: "2",
    category: "Biography",
    img: images.book2,
    title: "An Island",
    price: 10,
    normalPrice: 150,
    rate: 4,
  },
  {
    id: "3",
    category: "Mystery",
    img: images.book3,
    title: "Chike and the river",
    discount: 17,
    price: 200,
    normalPrice: 300,
    rate: 5,
  },
  {
    id: "4",
    category: "Novel",
    img: images.book4,
    title: "Killing Hemingway",
    discount: 40,
    price: 250,
    normalPrice: 300,
    rate: 5,
  },
  {
    id: "5",
    category: "Mystery",
    img: images.book5,
    title: "Stones Cryout",
    discount: 30,
    price: 102,
    normalPrice: 360,
    rate: 3,
  },
];

// country info
export const countryIfo = [
  {
    img: images.ctry1,
    country: "Nigeria",
    link: "shopname.ae",
  },
  {
    img: images.ctry2,
    country: "Kenya",
    link: "shopname.ky",
  },
  {
    img: images.ctry3,
    country: "Egypt",
    link: "shopname.et",
  },
  {
    img: images.ctry4,
    country: "Ghana",
    link: "shopname.gh",
  },
  {
    img: images.ctry5,
    country: "Senegal",
    link: "shopname.it",
  },
  {
    img: images.ctry3,
    country: "Cameroon",
    link: "Afruna.com.cd",
  },
  {
    img: images.ctry7,
    country: "Niger",
    link: "shopname.ae",
  },
  {
    img: images.ctry8,
    country: "Togo",
    link: "shopname.nr",
  },
  {
    img: images.ctry9,
    country: "Rwanda",
    link: "shopname.rd",
  },
  {
    img: images.ctry10,
    country: "Benin",
    link: "shopname.bn",
  },
];

// vendor info
export const vendorsInfo = [
  {
    img: images.seller1,
    name: "Majida Bhai munar",
    link: "@MBJbuy",
  },
  {
    img: images.seller2,
    name: "Majida Bhai muna",
    link: "@MBJbuy",
  },
  {
    img: images.seller3,
    name: "Majida Bh munar",
    link: "@MBJbuy",
  },
  {
    img: images.seller4,
    name: "Majida Bhai unar",
    link: "@MBJbuy",
  },
  // {
  //     img: images.seller2,
  //     name: 'Majida Bhai',
  //     link: '@MBJbuy',
  // }
];

// save items
export const saveItems = [
  {
    id: "1",
    category: "Fashion",
    img: images.product15,
    title: "Topa Pot",
    price: 102,
    normalPrice: 150,
    rate: 5,
  },
  {
    id: "2",
    category: "Art & Craft",
    img: images.product18,
    title: "Wedding Beads",
    price: 145,
    normalPrice: 150,
    rate: 4,
  },
  {
    id: "3",
    category: "Kitchen",
    img: images.product14,
    title: "Tyre Rhyme",
    price: 200,
    normalPrice: 300,
    rate: 3,
  },
];
// cart items
export const cartItems = [
  {
    img: images.cart1,
    name: " T-shirts with multiple colors, for men and lady",
    price: 175.5,
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
  },
  {
    name: "T-shirts and colors",
    img: images.product18,
    price: 145.5,
    size: "large",
    color: "Yellow",
    material: "polythene",
    seller: "Sara Market",
  },
  {
    img: images.product14,
    name: "T-shirts with multiple colors",
    price: 145.5,
    size: "small",
    color: "green",
    material: "rubber",
    seller: "Jon Don Company",
  },
  {
    name: "School bag",
    img: images.product18,
    price: 145.5,
    size: "large",
    color: "Yellow",
    material: "polythene",
    seller: "Sara Market",
  },
  {
    img: images.product14,
    name: "T-shirts",
    price: 145.5,
    size: "small",
    color: "green",
    material: "rubber",
    seller: "Jon Don Company",
  },
];

export const profileLinks = [
  {
    name: "My Profile",
    href: "/profile",
    icon: <IoMdPerson  className="md:text-lg" />,
  },
  {
    name: "My Order",
    href: "/order",
    icon: <HiShoppingBag className="md:text-lg"  />,
  },
  {
    name: "My Wish list",
    href: "/wishlist",
    icon: <BsFillHeartFill className="md:text-base"   />,
  },
  {
    name: "Notification",
    href: "/notification",
    icon: <IoNotifications className="md:text-lg"   />,
  },
  {
    name: "Review",
    href: "/review",
    icon: <MdOutlineRateReview className="md:text-lg"   />,
  },
];

export const wishListInfo = [
  {
    img: images.wishlist1,
    name: " Mens Long Sleeve T-shirt Cotton Base Layer Slim",
    price: 145.5,
    size: "XXL",
    color: "green",
    material: "rubber",
    normalPrice: 6.377,
    discount: -49,
    payOption: "Buy Now",
  },
  {
    img: images.product1,
    name: "Mens Long Sleeve T-shirt Cotton Slim",
    price: 145.5,
    material: "plastic",
    normalPrice: 6.377,
    discount: -8,
    payOption: "Out of Stock",
  },
  {
    img: images.product1,
    name: "T-shirt Cotton Slim",
    price: 145.5,
    color: "green",
    material: "plastic",
    normalPrice: 6.377,
    payOption: "Buy Now",
  },
  {
    img: images.wishlist1,
    name: "Mens Long Sleeve T-shirt Cotton Base",
    price: 145.5,
    material: "rubber",
    normalPrice: 6.377,
    discount: -20,
    payOption: "Buy Now",
  },
  {
    img: images.wishlist1,
    name: "Cotton Slim",
    price: 145.5,
    size: "XXL",
    color: "green",
    normalPrice: 6.377,
    payOption: "Out of Stock",
  },
];
export const reviewInfo = [
  {
    _id: '126327849877',
    img: images.wishlist1,
    name: " Mens Long Sleeve T-shirt Cotton Base Layer Slim",
    orderId: "46382792r02",
    date: "09/36/2028",
  },
  // {
  //   img: images.product,
  //   name: "Mens Long Sleeve T-shirt Cotton Slim",
  //   orderId: "46384592r02",
  //   date: "09/06/2020",
  // },
  {
    _id: '096576453287843898',
    img: images.product2,
    name: "T-shirt Cotton Slim",
    orderId: "46384592r02",
    date: "09/06/2020",
  },
  // {
  //   img: images.wishlist1,
  //   name: "Mens Long Sleeve T-shirt Cotton Base",
  //   orderId: "46384592f02",
  //   date: "09/06/2023",
  // },
];

export const detailImgInfo = [
  { img: images.detail1 },
  { img: images.detail2 },
  { img: images.detail3 },
  { img: images.detail4 },
  { img: images.product2 },
];

export const reviewsRating = [
  {
    id: 1,
    name: "Majida umma Bhai",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna enim ad minim veniam, quis nostrud eiusmod  aliqua. Ut exercitation",
    date: "23/06/2023",
    rate: 3,
  },
  {
    id: 2,
    name: "Majida umma Bahai",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna enim ad minim veniam, quis nostrud eiusmod  aliqua. Ut exercitation",
    date: "23/06/2023",
    rate: 5,
  },
  {
    id: 3,
    name: "Majida umma Bahai",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna enim ad minim veniam, quis nostrud eiusmod  aliqua. Ut exercitation",
    date: "23/06/2023",
    rate: 2,
  },
  {
    id: 4,
    name: "Majida umma Bahai",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna enim ad minim veniam, quis nostrud eiusmod  aliqua. Ut exercitation",
    date: "23/06/2023",
    rate: 4,
  },
];

export const brand = [
  {
    img: images.itelbrand,
  },
  {
    img: images.nikebrand,
  },
  {
    img: images.kelbrand,
  },
  {
    img: images.indobrand,
  },
  {
    img: images.belbrand,
  },
  {
    img: images.samung,
  },
];
