/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CiCalendar } from 'react-icons/ci';

const CustomDatePicker = ({ type = "date", selectedDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSelectors, setShowSelectors] = useState(false);
    
    // Convert the incoming string prop to a Date object for the view logic
    const safeDate = useMemo(() => selectedDate ? new Date(selectedDate) : null, [selectedDate]);
    const [viewDate, setViewDate] = useState(safeDate || new Date());
    
    const containerRef = useRef(null);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 201 }, (_, i) => new Date().getFullYear() - 100 + i);

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

    const formatOutput = (date) => {
        if (type === "datetime-local") {
            return date.toISOString(); // Keeps full timestamp
        }
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const handleSelect = (day) => {
        if (!day) return;
        const newDate = new Date(day);
        
        // If it's datetime, preserve existing time if available
        if (type === "datetime-local" && safeDate) {
            newDate.setHours(safeDate.getHours(), safeDate.getMinutes());
        }

        onChange?.(formatOutput(newDate));
        if (type === "date") setIsOpen(false);
    };

    const handleGoToToday = () => {
        const today = new Date();
        setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
        onChange?.(formatOutput(today));
        if (type === "date") setIsOpen(false);
    };

    const handleTimeChange = (e) => {
        const [hours, minutes] = e.target.value.split(':');
        const baseDate = safeDate ? new Date(safeDate) : new Date();
        baseDate.setHours(parseInt(hours), parseInt(minutes));
        onChange?.(formatOutput(baseDate));
    };

    return (
        <div className="relative w-full font-sans" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg border cursor-pointer transition-all
          ${isOpen ? 'border-[var(--primary-bg)] shadow-[var(--shadow-input-focus)]' : 'border-[var(--input-border-color)] hover:shadow-(--shadow-input-hover)'}`}
            >
                {safeDate ? (
                    <span className="font-semibold">
                        {type === "date"
                            ? safeDate.toLocaleDateString()
                            : safeDate.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                ) : (
                    <span className="text-[var(--secondary-text)]">Select Date</span>
                )}
                <CiCalendar className='w-5 h-5' />
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-[var(--input-border-color)] p-5 animate-in fade-in zoom-in duration-150 w-[320px]">

                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type='button'
                            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                            className="p-2 hover:bg-[var(--secondary-bg)] rounded-full transition-colors"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <div className="relative flex gap-1 px-2 py-1 text-base font-bold text-[var(--primary-text)] cursor-pointer select-none">
                            <span 
                                onClick={() => setShowSelectors(showSelectors === 'month' ? null : 'month')}
                                className="hover:text-[var(--primary-bg)]"
                            >
                                {months[viewDate.getMonth()]},
                            </span>
                            <span 
                                onClick={() => setShowSelectors(showSelectors === 'year' ? null : 'year')}
                                className="hover:text-[var(--primary-bg)]"
                            >
                                {viewDate.getFullYear()}
                            </span>

                            {showSelectors === 'month' && (
                                <div className="absolute top-full left-0 mt-2 w-32 max-h-48 overflow-y-auto bg-white border border-[var(--input-border-color)] shadow-xl rounded-lg z-[60]">
                                    {months.map((m, i) => (
                                        <div key={m} onClick={() => { setViewDate(new Date(viewDate.getFullYear(), i, 1)); setShowSelectors(null); }} className="px-3 py-2 text-sm hover:bg-[var(--secondary-bg)]">{m}</div>
                                    ))}
                                </div>
                            )}

                            {showSelectors === 'year' && (
                                <div className="absolute top-full right-0 mt-2 w-24 max-h-48 overflow-y-auto bg-white border border-[var(--input-border-color)] shadow-xl rounded-lg z-[60]">
                                    {years.map((y) => (
                                        <div key={y} onClick={() => { setViewDate(new Date(y, viewDate.getMonth(), 1)); setShowSelectors(null); }} className="px-3 py-2 text-sm hover:bg-[var(--secondary-bg)]">{y}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type='button'
                            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                            className="p-2 hover:bg-[var(--secondary-bg)] rounded-full transition-colors"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-tighter">
                        {days.map(d => <div key={d}>{d}</div>)}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, i) => {
                            const isSelected = day && safeDate && day.toDateString() === safeDate.toDateString();
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(day)}
                                    className={`h-8 flex items-center justify-center text-sm rounded-lg transition-all
                                        ${!day ? '' : 'cursor-pointer hover:bg-[var(--secondary-bg)]'}
                                        ${isSelected ? 'bg-[var(--primary-bg)] text-white hover:bg-[var(--primary-bg)]' : ''}`}
                                >
                                    {day?.getDate()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-4 border-t border-[var(--input-border-color)] flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleGoToToday}
                            className="text-[11px] font-bold text-[var(--primary-bg)] hover:underline uppercase"
                        >
                            Today
                        </button>

                        {type === "datetime-local" ? (
                            <input
                                type="time"
                                value={safeDate ? `${safeDate.getHours().toString().padStart(2, '0')}:${safeDate.getMinutes().toString().padStart(2, '0')}` : "00:00"}
                                onChange={handleTimeChange}
                                className="bg-[var(--secondary-bg)] text-[var(--primary-bg)] text-xs font-bold px-2 py-1 rounded-md outline-none"
                            />
                        ) : (
                            <span className="text-[10px] font-bold text-[var(--secondary-text)] uppercase">Date Only</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;