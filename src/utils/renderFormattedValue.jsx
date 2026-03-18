export const renderFormattedValue = (inputType, value) => {
    if (value === null || value === undefined || value === "") return <span className="text-slate-300 italic">Not provided</span>;
    if (value instanceof Boolean) return value ? "Yes" : "No";
    if (Array.isArray(value) && inputType !== "file") return value.join(", ");
    if (inputType === "file") {
        return <ul className="flex flex-col">
            {value.map(file => {
                return <li className="text-sm text-slate-900 font-medium">{file.name}</li>
            })}
        </ul>
    };
    if (inputType === "date") return new Date(value).toLocaleDateString();
    if (inputType === "datetime-local") return new Date(value).toLocaleString();
    if (inputType === "date-range") return `${value.startDate} to ${value.endDate}`;

    return String(value);
};