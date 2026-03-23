import { renderFormattedValue } from "../../utils/renderFormattedValue";
import SortingButton from "./SortingButton";

const Table = ({ columns, rows }) => {

    return (
        <div className="w-full overflow-visible overflow-x-auto rounded-lg border border-slate-200 ">
            <table className="w-full text-left text-sm">
                <thead className="bg-(--table-header-bg) text-white uppercase">
                    <tr>
                        {columns.map(({ label, sortBy, name }) => (
                            <th key={name} className="px-4 py-3 font-semibold whitespace-nowrap last:justify-center">
                                <div className={`flex items-center ${label === "Actions" ? "justify-center" : "justify-between"}`}>
                                    <span>{label}</span>
                                    {sortBy && <SortingButton name={name} sortBy={sortBy} rows={rows} />}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {rows.length === 0
                        ? <tr className="p-10 text-xl text-(--secondary-text)"><td className="text-center p-5" colSpan={columns.length}>No Data Found</td></tr>
                        : rows.map((row, index) => (
                            <tr key={row.rowId ?? `${index}-${row.id ?? "row"}`} className={`transition-colors ${index % 2 === 0 ? "bg-(--table-row-primary-bg)" : "bg-(--table-row-secondary-bg)"}  hover:bg-(--table-row-hover-bg)`}>
                                {columns.map(({ name }) => (
                                    <td key={name} className={`px-4 py-3 text-(--table-row-text) font-medium max-w-80 whitespace-nowrap`}>
                                        {renderFormattedValue(row[name])}
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