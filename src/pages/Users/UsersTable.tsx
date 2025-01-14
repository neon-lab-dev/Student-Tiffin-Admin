/* eslint-disable @typescript-eslint/no-explicit-any */
import { tdStyle, thStyle } from "./user.constants";
import Spinner from "../../components/shared/Loader/Spinner";

type TUser = {
  id: number;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  userType?: string;
  plan?: string;
  status: string;
};

type TUsersTableProps = {
  data: TUser[];
  columns: string[];
  isLoading: boolean;
};

const UsersTable: React.FC<TUsersTableProps> = ({ data, columns, isLoading }) => {
  // const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // const handleDropdownToggle = (rowId: number) => {
  //   setActiveDropdown((prev) => (prev === rowId ? null : rowId));
  // };

  // const handleSortToggle = () => {
  //   setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  // };

  // const sortedData =
  //   sortOrder === "asc"
  //     ? [...data].sort((a, b) => a.status.localeCompare(b.status))
  //     : sortOrder === "desc"
  //       ? [...data].sort((a, b) => b.status.localeCompare(a.status))
  //       : data;

  return (
    <div className="overflow-x-auto h-full">
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loader border-t-transparent border-4 border-gray-300 rounded-full w-8 h-8 animate-spin mb-4"></div>
          <p className="text-gray-500">No user available</p>
        </div>
      ) : (
        <table className="bg-white w-full rounded-3xl shadow border-collapse h-full">
          <thead className="bg-gray-100">
            <tr className="bg-white border-b">
              {columns?.map((col, index) => (
                <th
                  key={col}
                  className={`${thStyle} ${index === 0
                      ? "rounded-tl-3xl"
                      : index === columns.length - 1
                        ? "rounded-tr-3xl"
                        : ""
                    }`}
                >
                  {col}
                  {/* {col === "Status" && (
                    <img
                      src={ICONS.sort}
                      alt="sort-icon"
                      className="cursor-pointer ml-2 inline"
                      onClick={handleSortToggle}
                    />
                  )} */}
                </th>
              ))}
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
              ) : data?.length === 0 ? ( //sortedData will come here
                <tr>
                  <td colSpan={7} className="p-4 text-center text-[#6E7883] font-Poppins">
                    No User Available
                  </td>
                </tr>
              ) :
            
            (data?.map((user:any) => ( //sortedData will come here
              <tr key={user.id} className="border-b">
                <td className={tdStyle}>{user._id}</td>
                <td className={tdStyle}>
                  {user?.firstName} {user?.lastName}
                </td>
                <td className={tdStyle}>{user.email}</td>
                <td className={tdStyle}>{user.phone}</td>
                <td className={tdStyle}>{user.userType || user.plan}</td>
                {/* <td className={tdStyle}>
                  <div
                    className={`${user.status === "Unavailable"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#DCFFD6] text-[#24461F]"
                      } rounded-3xl py-[10px] px-5 font-Poppins leading-6 flex items-center justify-center`}
                  >
                    {user.status}
                  </div>
                </td> */}

                {/* Action buttons */}
                {/* <td className="text-[#6E7883] font-Poppins p-4 relative">
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
                </td> */}
              </tr>
            )))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
