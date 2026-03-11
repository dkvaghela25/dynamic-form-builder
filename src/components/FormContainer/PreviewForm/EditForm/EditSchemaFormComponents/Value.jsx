const Value = ({ formData, updateFormData }) => {

    const { options, type, value } = formData;

    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            value: { ...formData.value, [name]: value }
        }
        updateFormData(newFormData)
    }

    return (
        <>
            {!options &&
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Value</label>

                    {!(["file", "switch", "date-range"].includes(type)) &&
                        <div className="flex items-center gap-3">
                            <input
                                className={`w-full  rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                                    ${type === "range" ? "my-2 p-0!" : ""}
                                    ${type === "color" ? "h-12 p-0.5! rounded!" : ""}
                                `}
                                type={type !== "password" ? type : "text"}
                                name={"value"}
                                value={value}
                                onChange={updateFormData}
                            />
                            {type === "range" && <span className="text-[20px] font-semibold">{value}</span>}
                        </div>
                    }

                    {type === "date-range" &&
                        <div className="flex gap-3">
                            <input
                                className={`w-full border-slate-300 rounded-xl border bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                                type="date"
                                name="startDate"
                                value={value.startDate}
                                onChange={handleDateRangeChange}
                            />
                            <input
                                disabled={!value.startDate}
                                className={`w-full border-slate-300 rounded-xl border bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100`}
                                type="date"
                                name="endDate"
                                value={value.endDate}
                                onChange={handleDateRangeChange}
                                min={value.startDate}
                            />
                        </div>
                    }

                </div>
            }
        </>
    );
};

export default Value;