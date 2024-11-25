import { useState } from "react";
import { ICONS } from "../../assets";

const UsersTable = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const handleDropdownToggle = (rowId: number) => {
    setActiveDropdown((prev) => (prev === rowId ? null : rowId));
  };

  const users = [
    {
      id: 1,
      userId: "U123456",
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      plan: "Vegetarian Meal - Weekly",
      status: "Available",
    },
    {
      id: 2,
      userId: "U123457",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "9876543210",
      plan: "Keto Meal - Monthly",
      status: "Unavailable",
    },
    {
      id: 3,
      userId: "U123458",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      mobile: "5678901234",
      plan: "Vegan Meal - Weekly",
      status: "Available",
    },
    {
      id: 4,
      userId: "U123459",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      mobile: "6789012345",
      plan: "Vegetarian Meal - Daily",
      status: "Unavailable",
    },
  ];

  const sortedUsers =
    sortOrder === "asc"
      ? [...users].sort((a, b) => a.status.localeCompare(b.status))
      : sortOrder === "desc"
      ? [...users].sort((a, b) => b.status.localeCompare(a.status))
      : users;

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="bg-white w-full rounded-3xl shadow border-collapse">
        <thead className="bg-gray-100">
          <tr className="bg-white border-b">
            <th className="text-[#293241] font-Poppins font-medium p-4 text-left rounded-tl-3xl">
              User ID
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
              Subscription Plan
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
          {sortedUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="text-[#6E7883] font-Poppins p-4">{user.userId}</td>
              <td className="text-[#6E7883] font-Poppins p-4">{user.name}</td>
              <td className="text-[#6E7883] font-Poppins p-4">{user.email}</td>
              <td className="text-[#6E7883] font-Poppins p-4">{user.mobile}</td>
              <td className="text-[#6E7883] font-Poppins p-4">{user.plan}</td>
              <td className="text-[#6E7883] font-Poppins p-4">
                <div
                  className={`${
                    user.status === "Unavailable"
                      ? "bg-red-100 text-red-600"
                      : "bg-[#DCFFD6] text-[#24461F]"
                  } rounded-3xl py-[10px] px-5 font-Poppins leading-6 flex items-center justify-center`}
                >
                  {user.status}
                </div>
              </td>
              <td className="text-[#6E7883] font-Poppins p-4 relative">
                <button
                  onClick={() => handleDropdownToggle(user.id)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <img
                    src={ICONS.threeDots}
                    alt="three-dots"
                    className="size-6"
                  />
                </button>

                {activeDropdown === user.id && (
                  <div className="absolute right-0 mt-2 w-[226px] bg-white border rounded-2xl shadow-lg z-10 p-2">
                    <button
                      onClick={() => console.log(`Editing user ${user.id}`)}
                      className="block text-left w-full p-[10px] text-sm text-[#424B54] hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => console.log(`Deleting user ${user.id}`)}
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
    </div>
  );
};

export default UsersTable;
