import { Link } from "react-router-dom";
import FormSubmissionsTable from "../components/SubmissionDetails/FormSubmissionsTable";

const SubmissionDetails = () => {
    return (
        <div className="flex flex-col items-center gap-5 bg-white p-10 mx-auto rounded-2xl">
            <div className="w-full flex justify-between items-center border-b pb-5 border-(--border)">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Submission Details</h2>
                    <p className="mt-1 text-sm text-slate-500">Review the information captured from your recent submission.</p>
                </div>
                <Link to="/form"><button className="cursor-pointer h-fit rounded bg-(--table-header-bg) px-4 py-2.5 text-sm font-semibold text-white transition">Add Row</button></Link>
            </div>
            <FormSubmissionsTable />
        </div>
    );
};


export default SubmissionDetails; 