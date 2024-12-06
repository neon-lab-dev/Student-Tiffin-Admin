import { useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import OrdersTable from "./OrdersTable";
import { ICONS } from "../../assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Orders = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  console.log(selectedDate)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="pt-10">
      <div className="flex items-center justify-between">
        <Heading title="Orders" />
        <div className="relative">
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
      <OrdersTable />
    </div>
  );
};

export default Orders;
