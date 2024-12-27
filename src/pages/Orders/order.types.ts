export type TOrder = {
  _id: string;
  duration: string;
  endDate: string;
  isPaid: boolean;
  mealType: string;
  name: string;
  paymentId: string;
  paymentType: string;
  pickUpLocation: string;
  productId: string;
  startDate: string;
  status: string;
  total: number;
  totalMeals: number;
  updatedAt: string;
  createdAt: string;
  user: {
    _id: string
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
