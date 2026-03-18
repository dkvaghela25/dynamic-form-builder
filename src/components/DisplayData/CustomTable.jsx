import { useEffect, useState } from "react";
import { renderFormattedValue } from "../../utils/renderFormattedValue";
import Icon from "../ui/Icon";
import { useNavigate } from "react-router-dom";

const CustomTable = () => {

    const rawFormSchema = localStorage.getItem("formSchema")
    const rawFormData = localStorage.getItem("submittedFormData")
    const formSchema = JSON.parse(rawFormSchema) || [];
    const navigate = useNavigate();

    const [formData, setFormData] = useState(JSON.parse(rawFormData) || {});

    useEffect(() => {
        localStorage.setItem("submittedFormData", JSON.stringify(formData));
    }, [formData]);

    const tableColumns = formSchema.map(({ label }) => label)
    const tableRows = formData.map(({ data }) => data)

    const handleEdit = (e, index) => {
        e.preventDefault();
        const submissionId = formData[index].submissionId;
        navigate(`/form?submissionId=${submissionId}`)
    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        const newFormData = formData.filter((_, currIndex) => currIndex !== index);
        setFormData(newFormData);
    }

    return (
        <div className="max-w-[80vw] overflow-visible overflow-x-auto rounded-lg border border-slate-200 m-4 ">
            <table className="text-left">
                <thead className="bg-(--table-header-bg) text-white uppercase">
                    <tr>
                        {tableColumns.map((col) => (
                            <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                        <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {tableRows.map((row, index) => (
                        <tr key={index} className={`transition-colors ${index % 2 === 0 ? "bg-(--table-row-primary-color)" : "bg-(--table-row-secondary-color)"}`}>
                            {Object.values(row).map((value, index) => (
                                <td key={index} className={`px-4 py-3 text-(--table-row-text) font-normal max-w-80 whitespace-nowrap`}>
                                    {renderFormattedValue(value)}
                                </td>
                            ))}
                            <td className="px-4 py-3 whitespace-nowrap flex justify-center items-center gap-5">
                                <Icon icon="edit" onClick={(e) => handleEdit(e, index)} />
                                <Icon icon="delete" onClick={(e) => handleDelete(e, index)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
