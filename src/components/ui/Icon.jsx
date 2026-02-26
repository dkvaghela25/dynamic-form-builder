import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Icon = ({ icon, onClick }) => {
    return (
        <>
            {icon === "edit" && <FaEdit className="h-5 w-5 cursor-pointer text-emerald-500 transition hover:text-emerald-700" onClick={onClick} />}
            {icon === "delete" && <MdDelete className="h-5 w-5 cursor-pointer text-red-500 transition hover:text-rose-700" onClick={onClick} />}
        </>
    );
};

export default Icon;