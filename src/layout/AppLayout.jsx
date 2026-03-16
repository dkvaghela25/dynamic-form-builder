import { Outlet } from "react-router-dom";

const AppLayout = () => {

    return (
        <div className="min-h-screen w-full bg-[#F2F6FA] p-10">
            <Outlet />
        </div>
    );
};

export default AppLayout;