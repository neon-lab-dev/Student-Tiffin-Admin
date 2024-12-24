import { useState } from "react";
import { ICONS } from "../../assets";
import { Order } from "./order.types";
import Spinner from "../../components/shared/Loader/Spinner";

const OrdersTable = ({ orders, isLoading }: { orders: Order[]; isLoading: boolean }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleDropdownToggle = (rowId: number) => {
    setActiveDropdown((prev) => (prev === rowId ? null : rowId));
  };

  const sortedRows =
    sortOrder === "asc"
      ? [...orders].sort((a, b) => a.status.localeCompare(b.status))
      : sortOrder === "desc"
        ? [...orders].sort((a, b) => b.status.localeCompare(a.status))
        : orders;

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="bg-white w-full rounded-3xl shadow border-collapse h-full">
        <thead className="bg-gray-100">
          <tr className="bg-white border-b">
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tl-3xl">ID</th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">Name</th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">Email</th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">Mobile Number</th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">Order Type</th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left flex items-center gap-1">
              Status
              <img
                src={ICONS.sort}
                alt="sort-icon"
                className="cursor-pointer"
                onClick={handleSortToggle}
              />
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tr-3xl">Action</th>
          </tr>
        </thead>

        <tbody>
          {

            isLoading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  <div className="flex items-center justify-center h-[200px]">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : orders?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-[#6E7883] font-Poppins">
                  No Order Received
                </td>
              </tr>
            ) : (
              sortedRows.map((order: Order) => (
                <tr key={order._id} className="border-b">
                  <td className="text-[#6E7883] font-Poppins p-4">{order._id}</td>
                  <td className="text-[#6E7883] font-Poppins p-4">
                    {order.user?.firstName} {order?.user?.lastName}
                  </td>
                  <td className="text-[#6E7883] font-Poppins p-4">{order?.user?.email}</td>
                  <td className="text-[#6E7883] font-Poppins p-4">{order?.user?.phone}</td>
                  <td className="text-[#6E7883] font-Poppins p-4">
                    {order.name} - {order?.duration}
                  </td>
                  <td
                    className={`${order.status === "CANCELLED"
                        ? "text-[#DE3C4B]"
                        : order.status === "RECEIVED"
                          ? "text-blue-500"
                          : order.status === "PENDING"
                            ? "text-yellow-600"
                            : order.status === "APPROVED"
                              ? "text-green-600"
                              : "text-[#f59e0b]"
                      } font-Poppins leading-6 p-4`}
                  >
                    {order.status === "RECEIVED"
                      ? "Received"
                      : order.status === "PENDING"
                        ? "Pending"
                        : order.status === "OUTFORDELIVERY"
                          ? "Out for delivery"
                          : order.status === "APPROVED"
                            ? "Approved"
                            : "Cancelled"}
                  </td>
                  <td className="text-[#6E7883] font-Poppins p-4 relative">
                    <button
                      onClick={() => handleDropdownToggle(order._id)}
                      className="p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img src={ICONS.threeDots} alt="three-dots" className="size-6" />
                    </button>

                    {activeDropdown === order._id && (
                      <div className="absolute right-0 mt-2 w-[226px] bg-white border rounded-2xl shadow-lg z-10 p-2">
                        <button
                          onClick={() => console.log(`Editing order ${order._id}`)}
                          className="block text-left w-full p-[10px] text-sm text-[#424B54] hover:bg-gray-100"
                        >
                          Out for delivery
                        </button>
                        <button
                          className="block text-left w-full p-[10px] text-sm text-yellow-600 hover:bg-yellow-100 mt-1"
                        >
                          Pending
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
