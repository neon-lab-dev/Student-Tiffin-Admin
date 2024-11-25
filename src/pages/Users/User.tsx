import Heading from "../../components/shared/Heading/Heading";
import UsersTable from "./UsersTable";


const Users = () => {
  return (
    <div className="pt-10">
      <Heading title="Users" />
      <UsersTable/>
    </div>
  );
};

export default Users;
