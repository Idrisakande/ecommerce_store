import { T_initial_users_state, T_order, T_user_data } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
    initialState: {
        isActive: false,
        currentActiveUsersData: {
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            country: '',
            email: '',
            password: '',
            role: '',
            verificationToken: '',
            isVendor: false,
            fromOauth: false,
            blocked: false,
            isFollowing: null,
            isFollower: null,
            addresses: [''],
            followers: [''],
            following: [''],
            createdAt: '',
            updatedAt: '',
            avatar:"",
        } ,
        myData: {
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            country: '',
            email: '',
            password: '',
            role: '',
            verificationToken: '',
            isVendor: false,
            fromOauth: false,
            blocked: false,
            isFollowing: null,
            isFollower: null,
            addresses: [],
            followers: [],
            following: [],
            createdAt: '',
            updatedAt: '',
            avatar:"",
        } ,
        allUsersData: [
                {
                    _id: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    country: '',
                    email: '',
                    password: '',
                    role: '',
                    verificationToken: "",
                    isVendor: false,
                    fromOauth: false,
                    blocked: false,
                    isFollowing: null,
                    isFollower: null,
                    addresses: [''],
                    followers: [''],
                    following: [''],
                    createdAt: "",
                    updatedAt: "",
                    avatar: "",
                },
        ],
        allVendorsData: [
            {
                _id: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                country: '',
                email: '',
                password: '',
                role: '',
                verificationToken: '',
                isVendor: false,
                fromOauth: false,
                blocked: false,
                isFollowing: null,
                isFollower: null,
                addresses: [''],
                followers: [''],
                following: [''],
                createdAt: '',
                updatedAt: '',
                avatar:"",
            },
        ],
        oneUserByIdData: {
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            country: '',
            email: '',
            password: '',
            role: '',
            verificationToken: '',
            isVendor: false,
            fromOauth: false,
            blocked: false,
            isFollowing: null,
            isFollower: null,
            addresses: [''],
            followers: [''],
            following: [''],
            createdAt: '',
            updatedAt: '',
            avatar:"",
        },
        allOrderData: [
                {
                _id: '',
                userId: '',
                total: 0,
                createdAt: '',
                updatedAt:'',
                items: [
                    {
                      _id: '',
                      vendorId: '',
                      productId: {
                        _id: '',
                        name:'',
                        images: [''],
                      },
                      sessionId: '',
                      isPaid: false,
                      quantity: 0,
                      total: 0,
                      deliveryStatus: '',
                      isCanceled: false,
                      options: [],
                      createdAt: '',
                      updatedAt: '',
                    }
                  ]
              },
        ],
        // currentActiveUsersData: undefined,

    } as T_initial_users_state,
    name: "USERS",
    reducers: {
        updateUserActiveness(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
        },
        updateMyData(state, action: PayloadAction<T_user_data>) {
            state.myData = action.payload
        },
        updateAllUsersData(state, action: PayloadAction<T_user_data[]>) {
            state.allUsersData = action.payload
        },
        updateallVendorsData(state, action: PayloadAction<T_user_data[]>) {
            state.allVendorsData = action.payload
        },
        updateCurrentActiveUserData(state, action: PayloadAction<T_user_data>) {
            state.currentActiveUsersData = action.payload
        },
        updateOneUserByIdData(state, action: PayloadAction<T_user_data>) {
            state.oneUserByIdData = action.payload
        },
        updateAllOrderData(state, action: PayloadAction<T_order[]>) {
            state.allOrderData = action.payload
        },
    },
});

export const { updateUserActiveness, updateAllUsersData, updateAllOrderData, updateCurrentActiveUserData, updateMyData, updateOneUserByIdData } = Users.actions;
export default Users.reducer;
