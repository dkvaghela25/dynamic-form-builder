import { useState, useEffect } from "react";
import Select from "../ui/Select";

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

            const regex = new RegExp(value, "i");
            const filteredData = tableData.filter(row => regex.test(row[name]));
            setFilteredRows(filteredData);
        }, 500);

        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const options = formSchema.map(({ label, name }) => ({ label, value: name }));

    return (
        <div className="grid grid-cols-[1fr_2fr_2fr] gap-5 w-[80%] items-center rounded-2xl bg-(--table-row-secondary-color) p-6">
            <label className="font-semibold! text-xl uppercase">Search Table Data :</label>
            <Select
                options={options}
                handleChange={handleChange}
                name="name"
                value={filters.name}
                placeholder="Select Label"
                className="focus:border-(--table-header-bg)!"
            />
            <input
                disabled={!filters.name}
                name="value"
                value={filters.value}
                onChange={handleChange}
                type="text"
                placeholder={!filters.name ? "Select a label first..." : "Type to filter..."}
                className={`w-full pr-10 appearance-none rounded-lg border 
                    ${!filters.value ? "text-(--secondary-text) border-(--border)" : "text-(--primary-text)"}
                    bg-white px-2 py-1.5 outline-none transition focus:border-(--table-header-bg) disabled:cursor-not-allowed`}
            />
        </div>
    );
};

export default FilterInputs;
