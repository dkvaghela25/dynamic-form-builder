import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const Tooltip = ({ helperText, children }) => {
    const [userToggle, setUserToggle] = useState(false);
    return (
        <span
            className="relative"
            onMouseEnter={() => setUserToggle(true)}
            onMouseLeave={() => setUserToggle(false)}
        >
            {(userToggle && helperText) && (
                <span className="text-sm absolute z-50 -top-12 left-1/2 -translate-x-1/2 border border-slate-300 text-slate-700 bg-white rounded-md shadow-lg w-max flex flex-col text-center px-4 py-2">
                    {/* span to give the triangular tip effect */}
                    <span>{helperText}</span>
                    <span className="absolute top-7.5 left-1/2 transform -translate-x-1/2 border-slate-300 border-b border-r rotate-45 h-3 w-3 bg-white ">
                        {" "}
                    </span>
                </span>
            )}
            
            {children}

        </span>
    );
};

export default Tooltip;
