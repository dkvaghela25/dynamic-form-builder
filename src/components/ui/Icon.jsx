import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Icon = ({ icon, onClick }) => {

    const getDynamicStyles = () => {
        switch (icon) {
            case "edit": return "text-emerald-600 hover:bg-emerald-50";
            case "delete": return "text-red-600 hover:bg-red-50";
        }
    }

    const icons = {
        edit: <FaEdit />,
        delete: <MdDelete />
    }
    
    return (
        <button className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white cursor-pointer ${getDynamicStyles()}`} onClick={onClick}>
            {icons[icon]}
        </button>
    );
};

export default Icon;