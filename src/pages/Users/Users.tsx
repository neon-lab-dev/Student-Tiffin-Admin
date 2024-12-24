import { useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import UsersTable from "./UsersTable";
import { useGetAllUsersQuery } from "../../redux/Features/Auth/authApi";

const Users = () => {
  const {data:allUsers, isLoading} = useGetAllUsersQuery({});
  console.log(allUsers);
  const [userTab, setUserTab] = useState("All Users");

  const tabButtons = ["All Users", "Subscribed Users"];

  const data = userTab === "All Users" ? allUsers?.data : allUsers?.data;

  const columns =
    userTab === "All Users"
      ? ["User ID", "Name", "Email", "Mobile Number", "User Type", "Status", "Action"]
      : ["User ID", "Name", "Email", "Mobile Number", "Subscription Plan", "Status", "Action"];

  return (
    <div className="pt-10 flex flex-col gap-8 min-h-screen">
      <Heading title="Users" />

      <div className="flex items-center gap-8">
        {tabButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => setUserTab(btn)}
            className={`${
              userTab === btn ? "text-[#DE3C4B] border-b-4 border-[#DE3C4B]" : "text-[#293241]"
            } w-fit h-10`}
          >
            <h1 className="font-Poppins font-semibold">{btn}</h1>
          </button>
        ))}
      </div>

      <UsersTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default Users;
