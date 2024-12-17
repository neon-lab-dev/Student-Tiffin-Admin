import { useState } from "react";
import { ICONS } from "../../assets";
import ConfirmationModal from "./ConfirmationModal";
import { useGetAllProductsQuery } from "../../redux/Features/Products/productApi";
import { Link } from "react-router-dom";

type TProductImage = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
};

type TProduct = {
  availability: boolean;
  description: string;
  image: TProductImage;
  ingredients: string[];
  name: string;
  price: number;
  _v: number;
  _id: string;
};

const MenuTable = () => {
  const { data } = useGetAllProductsQuery({});
  const [productId, setProductId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleDropdownToggle = (rowId: string) => {
    setActiveDropdown((prev) => (prev === rowId ? null : rowId));
  };

  const products = data?.products;

  const sortedRows =
    sortOrder === "asc"
      ? [...products].sort((a, b) =>
          (a.status || "").localeCompare(b.status || "")
        )
      : sortOrder === "desc"
      ? [...products].sort((a, b) =>
          (b.status || "").localeCompare(a.status || "")
        )
      : products;

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  console.log(sortedRows);

  return (
    <div className="mt-8 overflow-x-auto min-h-screen">
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
          {sortedRows?.map((row: TProduct) => (
            <tr key={row._id} className="border-b">
              <td className="text-[#6E7883] font-Poppins p-4">
                {row._id.substring(0, 7) + "..."}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                <img
                  src={row?.image?.thumbnailUrl}
                  alt={row.name}
                  className="w-10 h-10 rounded-md"
                />
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">{row.name}</td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row?.ingredients?.map((ingredient: string, index: number) => (
                  <span key={index}>
                    {ingredient}
                    {index !== row.ingredients.length - 1 && ", "}
                  </span>
                ))}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                {row.description}
              </td>
              <td className="text-[#6E7883] font-Poppins p-4">
                <div
                  className={`${
                    row.availability !== true ? "bg-red-100" : "bg-[#DCFFD6]"
                  }  rounded-3xl py-[10px] px-5 text-[#24461F] font-Poppins leading-6 flex items-center justify-center`}
                >
                  {row.availability === true ? "Available" : "Unavailable"}
                </div>
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
                    <Link
                    to={`/dashboard/edit-product/${row._id}`}
                      onClick={() => console.log(`Editing row ${row._id}`)}
                      className="block text-left w-full p-[10px] text-sm text-[#424B54] hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setProductId(row._id);
                      }}
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

      {sortedRows?.length === 0 && (
        <p className="text-[#6E7883] font-Poppins text-center w-full mt-4">
          No Products Available
        </p>
      )}

      <ConfirmationModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        id={productId}
      />
    </div>
  );
};

export default MenuTable;
