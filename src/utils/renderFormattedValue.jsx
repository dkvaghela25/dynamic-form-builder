import { isValidElement } from "react";

export const renderFormattedValue = (value) => {

    if (value === null || value === undefined || value === "" || value.length === 0) return <span className="text-(--secondary-text) font-normal italic">--</span>;

    if (isValidElement(value)) return <>{value}</>

    if (typeof value === 'boolean') return value ? "✅" : "❌";

    if (typeof value === 'object' && !Array.isArray(value)) {
        if (!value.startDate) return <span className="text-(--secondary-text) italic font-normal">--</span>;
        return `${value.startDate} to ${value.endDate}`
    };

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