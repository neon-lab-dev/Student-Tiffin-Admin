import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar/>
            <div className="bg-[#F4F8FA]">
            <div className="max-w-[1280px] mx-auto px-5 xl:px-0">
            <Outlet/>
            </div>
            </div>
        </div>
    );
};

export default MainLayout;