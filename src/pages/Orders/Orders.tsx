/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import OrdersTable from "./OrdersTable";
import { ICONS } from "../../assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllOrdersQuery } from "../../redux/Features/Orders/orderApi";

const Orders = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  console.log(data)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const formatDate = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date.toISOString().split("T")[0];
  };

  // Filter orders based on the selected date
  const filteredOrders = data?.subscriptions?.filter((order: any) => {
    const orderDate = formatDate(new Date(order.createdAt));

    // If no date is selected, return all orders
    if (!selectedDate) {
      return true;
    }

    const selectedFormattedDate = formatDate(selectedDate);
    console.log(selectedFormattedDate);
    return orderDate === selectedFormattedDate;
  });

  return (
    <div className="pt-10 min-h-screen">
      <div className="flex items-center justify-between">
        <Heading title="Orders" />
        <div className="relative">
         <div className="flex items-center gap-5">
         <button
            type="button"
            onClick={() => setSelectedDate(null)}
            className="px-6 py-[14px] border border-[#DE3C4B] text-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold flex items-center gap-5"
          >
            All Orders
          </button>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="px-6 py-[14px] border border-[#DE3C4B] text-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold flex items-center gap-5"
          >
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : "Pick a Date"}
            <img src={ICONS.calendar} alt="calendar" className="size-6" />
          </button>
         </div>

          {isCalendarOpen && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>
      </div>
      <OrdersTable orders={filteredOrders} isLoading={isLoading} />
    </div>
  );
};

export default Orders;
