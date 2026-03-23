import { useState, useEffect } from "react";
import Select from "../ui/Select";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { MdFilterList, MdRotateLeft } from "react-icons/md";

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
        }, 400);

        return () => clearTimeout(handler);
    }, [filters, tableData, setFilteredRows]);

    const options = formSchema.map(({ label, name }) => ({ label, value: name }));

    const clearFilters = () => {
        setFilters({ name: "", value: "" });
    };

    return (
        <div className="mr-auto w-[50vw] flex flex-wrap items-center gap-4 p-4 bg-(--table-row-secondary-bg) shadow-sm rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 mr-2">
                <MdFilterList className="text-xl" />
                <span className="text-sm font-medium uppercase tracking-wider">Filters</span>
            </div>

            <div className="flex flex-1 items-center max-w-2xl gap-0 shadow-sm rounded-lg overflow-hidden border border-(--border) transition-all">

                <div className="w-1/2 border-r border-gray-200">
                    <Select
                        options={options}
                        handleChange={handleChange}
                        name="name"
                        value={filters.name}
                        placeholder="Select Column"
                        className="h-11 border-none bg-white focus:ring-0 rounded-none cursor-pointer"
                    />
                </div>

                <div className="relative flex-1 bg-white">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <IoIosSearch className={`${filters.name ? "text-(--table-header-bg)" : "text-gray-300"} w-5 h-5 transition-colors`} />
                    </div>

                    <input
                        disabled={!filters.name}
                        name="value"
                        value={filters.value}
                        onChange={handleChange}
                        type="text"
                        placeholder={!filters.name ? "Pick a column first..." : `Search ${options.find(o => o.value === filters.name)?.label}...`}
                        className="w-full pl-10 pr-10 h-11 border-none focus:ring-0 bg-transparent text-(--primary-text) disabled:cursor-not-allowed disabled:text-gray-400 placeholder:text-gray-400 focus:outline-none"
                    />

                    {filters.value && (
                        <button
                            onClick={() => setFilters(prev => ({ ...prev, value: "" }))}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                        >
                            <IoMdCloseCircle className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={clearFilters}
                disabled={!filters.name && !filters.value}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 
                    ${!filters.name && !filters.value
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                        : "bg-(--table-header-bg) text-white hover:shadow-md active:scale-95"}`}
            >
                <MdRotateLeft className="text-lg" />
                Reset
            </button>
        </div>
    );
};

export default FilterInputs;