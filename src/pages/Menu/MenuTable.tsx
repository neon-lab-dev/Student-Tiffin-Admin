import React, { useState } from "react";
import { ICONS } from "../../assets";
import ConfirmationModal from "./ConfirmationModal";

const MenuTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleDropdownToggle = (rowId: number) => {
    setActiveDropdown((prev) => (prev === rowId ? null : rowId));
  };

  const rows = [
    {
      id: 1,
      dishId: "345345",
      image: "https://via.placeholder.com/50",
      dishName: "Hyderabadi Aloo Tawa Fry",
      ingredients: "Potato, spices, oil",
      description: "Grilled paneer marinated in spices",
      status: "Available",
    },
    {
      id: 2,
      dishId: "567567",
      image: "https://via.placeholder.com/50",
      dishName: "Paneer Tikka",
      ingredients: "Paneer, spices, oil",
      description: "Grilled paneer marinated in spices",
      status: "Unavailable",
    },
    {
      id: 3,
      dishId: "890890",
      image: "https://via.placeholder.com/50",
      dishName: "Chicken Biryani",
      ingredients: "Chicken, rice, spices",
      description: "Spicy chicken and rice dish",
      status: "Available",
    },
  ];

  const sortedRows =
    sortOrder === "asc"
      ? [...rows].sort((a, b) => a.status.localeCompare(b.status))
      : sortOrder === "desc"
      ? [...rows].sort((a, b) => b.status.localeCompare(a.status))
      : rows;

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="bg-white w-full rounded-3xl shadow border-collapse">
        <thead className="bg-gray-100">
          <tr className="bg-white border-b">
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tl-3xl">
              ID
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Image
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Dish Name
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Ingredients
            </th>
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left">
              Description
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
          {sortedRows.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="text-[#6E7883] font-Poppins p-4">{row.dishId}</td>
              <td className="text-[#6E7883] font-Poppins p-4">
                <img
                  src={row.image}
                  alt={row.dishName}
                  className="w-10 h-10 rounded-md"
                />
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row.dishName}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row.ingredients}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row.description}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                <div
                  className={`${
                    row.status === "Unavailable" ? "bg-red-100" : "bg-[#DCFFD6]"
                  }  rounded-3xl py-[10px] px-5 text-[#24461F] font-Poppins leading-6 flex items-center justify-center`}
                >
                  {row.status}
                </div>
              </td>
              <td className="text-[#6E7883] font-Poppins p-4 relative">
                <button
                  onClick={() => handleDropdownToggle(row.id)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <img
                    src={ICONS.threeDots}
                    alt="three-dots"
                    className="size-6"
                  />
                </button>

                {activeDropdown === row.id && (
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

export default MenuTable;
