import { string } from "joi";

export type T_initial_users_state = {
  isActive: boolean;
  allUsersData: T_user_data[];
  allVendorsData: T_user_data[];
  currentActiveUsersData: T_user_data;
  oneUserByIdData: T_user_data;
  myData: T_user_data;
  allOrderData: T_order[];
};

export type T_user_data =
  | {
    _id: string
    firstName: string
    lastName: string
    phoneNumber: string
    country: string
    email: string
    password: string
    role: string
    verificationToken: string
    isVendor: boolean
    fromOauth: boolean
    blocked: boolean
    isFollowing: null
    isFollower: null
    addresses: string[];
    followers: string[];
    following: string[];
    createdAt: ''
    updatedAt: string; 
    avatar: string
}
  | undefined;

export type T_order = 
  {
    _id: string;
    userId: string;
    total: number;
    createdAt: string;
    updatedAt: string;
    items: T_order_item[]
  }

  export type T_order_item = {
    _id: string;
    vendorId: string;
    productId: {
      _id: string;
      name: string;
      images: [''];
    };
    sessionId: string;
    isPaid: boolean;
    quantity: number;
    total: number;
    deliveryStatus: string;
    isCanceled: boolean;
    options: [];
    createdAt: string;
    updatedAt: string;
  }

