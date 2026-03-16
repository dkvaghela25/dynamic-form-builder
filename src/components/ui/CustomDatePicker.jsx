import { useEffect, useRef, useState } from "react";
import { GoCalendar, GoChevronLeft, GoChevronRight } from "react-icons/go";

const CustomDatePicker = ({ currValue, error, schema }) => {

    const [value, setValue] = useState(currValue);

    const containerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const totalDays = endOfMonth.getDate();

    const handleDateClick = (day) => {
        const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setValue(selected.toISOString().split("T")[0]);
        setIsOpen(false);
    };

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between cursor-pointer border py-2 px-3 rounded-lg transition-all duration-300
                    ${isOpen ? "border-blue-500 shadow-(--shadow-input-focus)" : "border-(--input-border-color)"}
                    ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
               `}
            >
                <span className={value ? "text-slate-900" : "text-slate-400"}>
                    {value ? new Date(value).toLocaleDateString() : schema?.placeholder || "Select Date"}
                </span>
                <GoCalendar className="text-slate-500 w-5 h-5" />
            </div>

            <div
                className={`
                 absolute z-50 mt-2 p-4 bg-white border border-slate-200 rounded-xl shadow-2xl w-75
                 transition-all duration-200 origin-top
                 ${isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}
               `}
            >
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                        <GoChevronLeft size={20} />
                    </button>
                    <h3 className="font-bold text-slate-800">
                        {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </h3>
                    <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                        <GoChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                    {days.map(day => <span key={day} className="text-center text-xs font-bold text-slate-400">{day}</span>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: totalDays }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === viewDate.getMonth() && new Date(value).getFullYear() === viewDate.getFullYear();
                        return (
                            <button
                                key={day}
                                type="button"
                                onClick={() => handleDateClick(day)}
                                className={`
                         h-8 w-8 text-sm rounded-lg flex items-center justify-center transition-all
                         ${isSelected ? "bg-(--primary-bg) text-white shadow-md" : "hover:bg-blue-50 text-slate-700"}
                       `}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;