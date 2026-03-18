import { renderFormattedValue } from "../../utils/renderFormattedValue";

const CustomTable = () => {

    const rawFormSchema = localStorage.getItem("formSchema")
    const rawFormData = localStorage.getItem("formSchema")
    const formSchema = JSON.parse(rawFormSchema) || [];
    const formData = JSON.parse(rawFormData) || {};
    const { data, submissionTime } = formData;


    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
            CustomTable
        </div>

    );
};

export default CustomTable;