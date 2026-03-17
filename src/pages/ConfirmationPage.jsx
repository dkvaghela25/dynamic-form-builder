
import { FiPrinter } from "react-icons/fi";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const formSchema = JSON.parse(localStorage.getItem("formSchema")) || [];
    const submittedFormData = JSON.parse(localStorage.getItem("submittedFormData")) || {};
    const { data, submissionTime } = submittedFormData;

    const displayData = [];
    formSchema.forEach(({ label, name, type }) => {
        displayData.push({
            type,
            label,
            value: data[name],
        })
    });

    const handlePrint = () => {
        window.print();
    };

    console.log(displayData);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 print:hidden">
                <button
                    onClick={() => navigate("/final-form")}
                    className="cursor-pointer flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <GoChevronLeft /> Edit Submission
                </button>
                <button
                    onClick={handlePrint}
                    className="cursor-pointer flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all"
                >
                    <FiPrinter /> Print Summary
                </button>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
                <div className="bg-slate-900 px-6 py-4">
                    <h2 className="text-white font-semibold tracking-wide">Summary Report</h2>
                </div>

                <div className="px-6 py-3">
                    <div className="grid grid-cols-1">
                        {displayData.map(({ label, value, type }, index) => (
                            <div key={index} className="grid grid-cols-[1fr_2fr] border-b border-slate-300 py-2">
                                <dt className="text-xs font-bold uppercase tracking-wider mb-1">
                                    {label}
                                </dt>
                                <dd className="text-sm text-slate-900 font-medium">
                                    {renderFormattedValue(type, value)}
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 text-center">
                    <p className="text-[11px] text-slate-400 uppercase font-bold tracking-widest">
                        Submitted on {new Date(submissionTime).toLocaleDateString()} at {new Date(submissionTime).toLocaleTimeString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

const renderFormattedValue = (inputType, value) => {
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

export default ConfirmationPage;