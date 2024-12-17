import { useState } from "react";
import { ICONS } from "../../assets";
import ConfirmationModal from './../Menu/ConfirmationModal';

const OrdersTable = ({orders}) => {
  const [openModal, setOpenModal] = useState(false);
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
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tl-3xl">
              ID
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Name
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
             Email
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Mobile Number
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
            Order Type
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left flex items-center gap-1">
              Status
              <img
                src={ICONS.sort}
                alt="sort-icon"
                className="cursor-pointer"
                onClick={handleSortToggle}
              />
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tr-3xl">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedRows?.map((row) => (
            <tr key={row._id} className="border-b">
              <td className="text-[#6E7883] font-Poppins p-4">{row._id}</td>
              <td className="text-[#6E7883] font-Poppins p-4">{row.user?.firstName} {" "} {row?.user?.lastName}</td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row?.user?.email}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row?.user?.phone}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row.orderType}
              </td>
              <td className={`${
                    row.status === "Cancelled" ? "text-[#DE3C4B]" : "text-[#24461F]"
                  }  font-Poppins leading-6 p-4`}>
                  {row.status}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4 relative">
                <button
                  onClick={() => handleDropdownToggle(row._id)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <img
                    src={ICONS.threeDots}
                    alt="three-dots"
                    className="size-6"
                  />
                </button>

                {activeDropdown === row._id && (
                  <div className="absolute right-0 mt-2 w-[226px] bg-white border rounded-2xl shadow-lg z-10 p-2">
                    <button
                      onClick={() => console.log(`Editing row ${row.id}`)}
                      className="block text-left w-full p-[10px] text-sm text-[#424B54] hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setOpenModal(true)}
                      className="block text-left w-full p-[10px] text-sm text-[#DE3C4B] hover:bg-red-100 mt-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal setOpenModal={setOpenModal} openModal={openModal}/>
    </div>
  );
};

export default OrdersTable;
