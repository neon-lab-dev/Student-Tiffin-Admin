import { Link } from "react-router-dom";
import Heading from "../../components/shared/Heading/Heading";
import MenuTable from "./MenuTable";

const Menu = () => {
  return (
    <div className="pt-10">
      <div className="flex items-center justify-between">
      <Heading title="Menu" />
      <Link
        to={"/dashboard/add-product"}
        type="submit"
        className="px-6 py-[14px] text-white bg-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold"
      >
        Add Product
      </Link>
      </div>
      <MenuTable/>
    </div>
  );
};

export default Menu;
