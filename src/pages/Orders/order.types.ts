/* eslint-disable @typescript-eslint/no-explicit-any */
interface ShippingInfo {
    street: string;
    city: string;
    pinCode: number;
    phoneNo: number;
  }
  
  interface UserAddress {
    street: string;
    city: string;
    pin: string;
    country: string;
  }
  
  interface User {
    _id: string;
    email: string;
    phone: string;
    isVerified: boolean;
    __v: number;
    firstName: string;
    lastName: string;
    address: UserAddress;
  }
  
  interface Product {
    product: any;
    quantity: number;
    _id: string;
  }
  
  export interface Order {
    shippingInfo: ShippingInfo;
    _id: string;
    orderType:string;
    user: User;
    products: Product[];
    paid: boolean;
    status: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    paymentId: string;
  }
  