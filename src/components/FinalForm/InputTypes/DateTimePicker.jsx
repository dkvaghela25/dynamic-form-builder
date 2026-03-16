import { useState, useRef, useEffect } from "react";
import { GoCalendar, GoChevronLeft, GoChevronRight, GoClock } from "react-icons/go";

const DateTimePicker = ({ field, error, schema }) => {
  const { placeholder } = schema;
  const { value, onChange } = field;
  
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Calendar Logic
  const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const handleDateTimeChange = (newDate) => {
    onChange(newDate.toISOString());
  };

  const handleDateClick = (day) => {
    const current = value ? new Date(value) : new Date();
    const nextDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, current.getHours(), current.getMinutes());
    handleDateTimeChange(nextDate);
  };

  const handleTimeChange = (type, unitValue) => {
    const current = value ? new Date(value) : new Date();
    if (type === 'hour') current.setHours(unitValue);
    if (type === 'minute') current.setMinutes(unitValue);
    handleDateTimeChange(new Date(current));
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedDate = value ? new Date(value) : null;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between cursor-pointer border py-2 px-3 rounded-lg transition-all duration-300
          ${isOpen ? "border-blue-500 shadow-(--shadow-input-focus)" : "border-(--input-border-color)"}
          ${error ? "border-red-500 shadow-(--shadow-input-error)!" : "hover:shadow-(--shadow-input-hover)"}
        `}
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value 
            ? selectedDate.toLocaleDateString() + " " + selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : placeholder || "Select Date & Time"}
        </span>
        <div className="flex gap-2 text-slate-400">
           <GoClock className="w-4 h-4" />
           <GoCalendar className="w-4 h-4" />
        </div>
      </div>

      {/* Popover */}
      <div
        className={`
          absolute z-50 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden
          transition-all duration-200 origin-top
          ${isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}
        `}
      >
        {/* Calendar Section */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-full"><GoChevronLeft /></button>
            <h3 className="font-bold text-sm">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</h3>
            <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-full"><GoChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {days.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => <div key={i} />)}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === viewDate.getMonth();
              return (
                <button
                  key={day} type="button" onClick={() => handleDateClick(day)}
                  className={`h-8 w-8 text-xs rounded-md flex items-center justify-center transition-all ${isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Section */}
        <div className="bg-slate-50 p-4 flex flex-row md:flex-col gap-4 justify-center items-center min-w-[120px]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Hour</span>
            <select 
              value={selectedDate?.getHours() || 0} 
              onChange={(e) => handleTimeChange('hour', parseInt(e.target.value))}
              className="bg-white border rounded p-1 text-sm outline-none focus:border-blue-500"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Min</span>
            <select 
              value={selectedDate?.getMinutes() || 0} 
              onChange={(e) => handleTimeChange('minute', parseInt(e.target.value))}
              className="bg-white border rounded p-1 text-sm outline-none focus:border-blue-500"
            >
              {[0, 15, 30, 45].map(m => (
                <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;