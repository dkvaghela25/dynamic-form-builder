export const renderFormattedValue = (value) => {

    if (value === null || value === undefined || value === "") return <span className="text-slate-300 italic">Not provided</span>;

    if (typeof value === 'boolean') return value ? "✅" : "❌";

    if (typeof value === 'object' && value.startDate) return `${value.startDate} to ${value.endDate}`;

    if (Array.isArray(value)) return value.map(item => (typeof item === 'object' ? item.name : item)).join(", ");

    if (typeof value === 'string' && value.startsWith('#')) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border" style={{ backgroundColor: value }}></div>
                {value}
            </div>
        );
    }

    return value.toString();
};