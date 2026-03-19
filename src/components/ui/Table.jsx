import { renderFormattedValue } from "../../utils/renderFormattedValue";

const Table = ({ columns, rows }) => {
    console.log(columns)
    return (
        <div className="w-full overflow-visible overflow-x-auto rounded-lg border border-slate-200 m-4 ">
            <table className="w-full text-left">
                <thead className="bg-(--table-header-bg) text-white uppercase">
                    <tr>
                        {columns?.map(({name, label}) => (
                            <th key={name} className="px-4 py-3 font-semibold whitespace-nowrap last:text-center">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {rows?.map((row, index) => (
                        <tr key={index} className={`transition-colors ${index % 2 === 0 ? "bg-(--table-row-primary-color)" : "bg-(--table-row-secondary-color)"}`}>
                            {Object.values(row).map((value, index) => (
                                <td key={index} className={`px-4 py-3 text-(--table-row-text) font-medium max-w-80 whitespace-nowrap`}>
                                    {renderFormattedValue(value)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;