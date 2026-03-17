import { Outlet } from "react-router-dom";
import Toast from "../components/ui/Toast";

const AppLayout = () => {

    return (
        <div className="min-h-screen w-full bg-[#F2F6FA] p-10">
            <Toast />
            <Outlet />
        </div>
    );
};

export default AppLayout;