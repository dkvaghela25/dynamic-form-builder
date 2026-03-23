import { useState, useEffect } from "react";
import Select from "../ui/Select";
import { IoIosSearch } from "react-icons/io";

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const FilterInputs = ({ formSchema, tableData, setFilteredRows }) => {
    const [filters, setFilters] = useState({
        name: "",
        value: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setFilters({ name: value, value: "" });
        } else {
            setFilters(prev => ({ ...prev, value }));
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            const { name, value } = filters;
            if (!value || !name) {
                setFilteredRows(tableData);
                return;
            }

            const regex = new RegExp(escapeRegExp(value), "i");
            const filteredData = tableData.filter((row) => regex.test(String(row[name] ?? "")));
            setFilteredRows(filteredData);
        }, 500);

        return () => clearTimeout(handler);
    }, [filters, tableData, setFilteredRows]);

    const options = formSchema.map(({ label, name }) => ({ label, value: name }));

    const clearFilters = () => {
        setFilters({ name: "", value: "" });
    };

    return (
        <div className={`grid ${!(filters.value && filters.name) ? "grid-cols-2" : "grid-cols-[2fr_2fr_0.1fr]"}  items-center gap-3 justify-self-left rounded-lg w-full max-w-3xl bg-(--table-row-secondary-bg) p-4 justify-between border border-gray-100 shadow-sm`}>
            <div className="">
                <Select
                    options={options}
                    handleChange={handleChange}
                    name="name"
                    value={filters.name}
                    placeholder="Search By Column"
                    className="h-10 border-(--border) hover:border-(--table-header-bg) focus:border-(--table-header-bg)!"
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <IoIosSearch className="text-gray-400 w-5 h-5" />
                </div>

                <input
                    disabled={!filters.name}
                    name="value"
                    value={filters.value}
                    onChange={handleChange}
                    type="text"
                    placeholder={!filters.name ? "Select a column to start..." : `Search in ${options.find(o => o.value === filters.name)?.label}...`}
                    className={`w-full pl-10 pr-10 h-10 rounded-lg border transition-all outline-none
                        ${!filters.name ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "bg-white border-(--border) focus:border-(--table-header-bg) focus:ring-1 focus:ring-(--table-header-bg)/20"}
                        text-(--primary-text)`}
                />

            </div>

            {filters.value && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="inset-y-0 px-4 py-1.5 rounded-md  flex items-center bg-(--destructive) text-white cursor-pointer transition-colors"
                >
                    Reset
                </button>
            )}

        </div>
    );
};

export default FilterInputs;