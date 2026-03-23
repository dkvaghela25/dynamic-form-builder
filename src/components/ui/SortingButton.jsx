import { useEffect, useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortingButton = ({ sortBy, name }) => {
    const [sortingOrder, setSortingOrder] = useState(null);

    const handleToggle = () => {
        if (sortingOrder === null) return setSortingOrder("Asc");
        setSortingOrder(prev => (prev === "Asc" ? "Desc" : "Asc"));
    };

    useEffect(() => {
        if (sortingOrder) sortBy(name, sortingOrder);
    }, [sortingOrder, sortBy, name]);

    const renderIcon = () => {
        if (sortingOrder === "Asc") return <FaSortUp className="w-5 h-5 cursor-pointer" />;
        if (sortingOrder === "Desc") return <FaSortDown className="w-5 h-5 cursor-pointer" />;
        return <FaSort className="w-5 h-5 cursor-pointer opacity-50" />;
    };

    return (
        <button type="button" onClick={handleToggle} aria-label={`Sort by ${name}`}>
            {renderIcon()}
        </button>
    );
};

export default SortingButton;
