import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomDatePicker = ({ type = "date", selectedDate, handleChange, min, max, errorMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const [showSelectors, setShowSelectors] = useState(false);

    const safeDate = useMemo(() => selectedDate ? new Date(selectedDate) : null, [selectedDate]);
    const [viewDate, setViewDate] = useState(safeDate || new Date());

    const containerRef = useRef(null);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 201 }, (_, i) => new Date().getFullYear() - 100 + i);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 350;

            setDropUp(spaceBelow < dropdownHeight);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setShowSelectors(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMo = new Date(year, month + 1, 0).getDate();
        const daysArr = [];
        for (let i = 0; i < firstDay; i++) daysArr.push(null);
        for (let d = 1; d <= daysInMo; d++) daysArr.push(new Date(year, month, d));
        return daysArr;
    }, [viewDate]);

    const formatOutput = (selectedDate) => {
        const date = selectedDate.getDate().toString().padStart(2, '0');
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = selectedDate.getFullYear().toString();
        const hours = selectedDate.getHours().toString().padStart(2, '0');
        const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
        if (type === "datetime-local") {
            return `${year}-${month}-${date}T${hours}:${minutes}`;
        }
        return `${year}-${month}-${date}`;
    };

    const handleSelect = (day) => {
        if (!day) return;
        const newDate = new Date(day);

        if (type === "datetime-local" && safeDate) {
            newDate.setHours(safeDate.getHours(), safeDate.getMinutes());
        }

        handleChange?.(formatOutput(newDate));
        if (type === "date") setIsOpen(false);
    };

    const handleGoToToday = () => {
        const today = new Date();
        setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
        handleChange?.(formatOutput(today));
        if (type === "date") setIsOpen(false);
    };

    const handleTimeChange = (e) => {
        const [hours, minutes] = e.target.value.split(':');
        const baseDate = safeDate ? new Date(safeDate) : new Date();
        baseDate.setHours(parseInt(hours), parseInt(minutes));
        handleChange?.(formatOutput(baseDate));
    };

    return (
        <div className="relative w-full font-sans" ref={containerRef}>
            <div className='flex flex-col gap-1.5 w-full'>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg border cursor-pointer transition-all
                    ${isOpen && !errorMessage ? 'border-(--primary-bg) shadow-(--shadow-input-focus)' : 'border-(--input-border-color) hover:shadow-(--shadow-input-hover)'}
                    ${errorMessage ? " shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
                    `}
                >
                    {safeDate ? (
                        <span className="font-semibold">
                            {type === "date"
                                ? safeDate.toLocaleDateString()
                                : safeDate.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                    ) : (
                        <span className="text-(--secondary-text)">Select Date</span>
                    )}
                    <CiCalendar className='w-5 h-5' />
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${errorMessage ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className={`-mt-1 text-(--input-error-border-color) text-[13px]`}>
                        * {errorMessage}
                    </p>
                </div>
            </div>

            <div
                className={`
                    absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-(--input-border-color) p-5 animate-in fade-in zoom-in duration-150 w-[320px] overflow-hidden  hidden
                    transition-all ease-out origin-top
                    ${isOpen
                        ? "opacity-100 scale-100 translate-y-0 flex! flex-col"
                        : "opacity-0 scale-95 -translate-y-2 "
                    }
                    ${dropUp
                        ? "bottom-full mb-2 origin-bottom"
                        : "top-full mt-2 origin-top"
                    }
                `}
            >

                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        type='button'
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                        className="p-2 cursor-pointer hover:bg-(--secondary-bg) rounded-full transition-colors"
                    >
                        <FaChevronLeft className='w-3 h-3' />
                    </button>

                    <div className="relative flex gap-1 px-2 py-1 text-base font-bold text-(--primary-text) cursor-pointer select-none">
                        <span
                            onClick={() => setShowSelectors(showSelectors === 'month' ? null : 'month')}
                            className="hover:text-(--primary-bg)"
                        >
                            {months[viewDate.getMonth()]},
                        </span>
                        <span
                            onClick={() => setShowSelectors(showSelectors === 'year' ? null : 'year')}
                            className="hover:text-(--primary-bg)"
                        >
                            {viewDate.getFullYear()}
                        </span>

                        {showSelectors === 'month' && (
                            <div className="absolute top-full left-0 mt-2 w-32 max-h-48 overflow-y-auto bg-white border border-(--input-border-color) shadow-xl rounded-lg z-60">
                                {months.map((m, i) => (
                                    <div key={m} onClick={() => { setViewDate(new Date(viewDate.getFullYear(), i, 1)); setShowSelectors(null); }} className="px-3 py-2 text-sm hover:bg-(--secondary-bg)">{m}</div>
                                ))}
                            </div>
                        )}

                        {showSelectors === 'year' && (
                            <div className="absolute top-full right-0 mt-2 w-24 max-h-48 overflow-y-auto bg-white border border-(--input-border-color) shadow-xl rounded-lg z-60">
                                {years.map((y) => (
                                    <div key={y} onClick={() => { setViewDate(new Date(y, viewDate.getMonth(), 1)); setShowSelectors(null); }} className="px-3 py-2 text-sm hover:bg-(--secondary-bg)">{y}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type='button'
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                        className="p-2 cursor-pointer hover:bg-(--secondary-bg) rounded-full transition-colors"
                    >
                        <FaChevronRight className='w-3 h-3' />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-bold text-(--secondary-text) uppercase tracking-tighter">
                    {days.map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                        const isSelected = day && safeDate && day.toDateString() === safeDate.toDateString();
                        return (
                            <button
                                disabled={day < new Date(min) || day > new Date(max)}
                                type='button'
                                key={i}
                                onClick={() => handleSelect(day)}
                                className={`h-8 flex items-center justify-center text-sm rounded-lg transition-all disabled:text-slate-400
                                        ${!day ? '' : 'cursor-pointer hover:bg-(--secondary-bg)'}
                                        ${isSelected ? 'bg-(--primary-bg) text-white hover:bg-(--primary-bg)' : ''}`}
                            >
                                {day?.getDate()}
                            </button>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-(--input-border-color) flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleGoToToday}
                        className="text-[11px] font-bold text-(--primary-bg) hover:underline uppercase"
                    >
                        Today
                    </button>

                    {type === "datetime-local" ? (
                        <input
                            type="time"
                            value={safeDate ? `${safeDate.getHours().toString().padStart(2, '0')}:${safeDate.getMinutes().toString().padStart(2, '0')}` : "00:00"}
                            onChange={handleTimeChange}
                            className="bg-(--secondary-bg) text-(--primary-bg) text-xs font-bold px-2 py-1 rounded-md outline-none"
                        />
                    ) : (
                        <span className="text-[10px] font-bold text-(--secondary-text) uppercase">Date Only</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;