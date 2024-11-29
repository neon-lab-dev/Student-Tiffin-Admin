import { useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import UsersTable from "./UsersTable";

const Users = () => {
  const [userTab, setUserTab] = useState("All Users");

  const tabButtons = ["All Users", "Subscribed Users"];

  // Data for "All Users"
  const allUsersData = [
    { id: 1, userId: "U123456", name: "John Doe", email: "john.doe@example.com", mobile: "1234567890", userType: "Admin", status: "Available" },
    { id: 2, userId: "U123457", name: "Jane Smith", email: "jane.smith@example.com", mobile: "9876543210", userType: "Subscriber", status: "Unavailable" },
    { id: 3, userId: "U123458", name: "Alice Johnson", email: "alice.johnson@example.com", mobile: "5678901234", userType: "Guest", status: "Available" },
  ];

  // Data for "Subscribed Users"
  const subscribedUsersData = [
    { id: 1, userId: "U123459", name: "Robert Brown", email: "robert.brown@example.com", mobile: "6789012345", plan: "Vegetarian Meal - Daily", status: "Unavailable" },
    { id: 2, userId: "U123460", name: "Emily Clark", email: "emily.clark@example.com", mobile: "2345678901", plan: "Keto Meal - Weekly", status: "Available" },
  ];

  const data = userTab === "All Users" ? allUsersData : subscribedUsersData;

  const columns =
    userTab === "All Users"
      ? ["User ID", "Name", "Email", "Mobile Number", "User Type", "Status", "Action"]
      : ["User ID", "Name", "Email", "Mobile Number", "Subscription Plan", "Status", "Action"];

  return (
    <div className="pt-10 flex flex-col gap-8">
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

      <UsersTable data={data} columns={columns} />
    </div>
  );
};

export default Users;
