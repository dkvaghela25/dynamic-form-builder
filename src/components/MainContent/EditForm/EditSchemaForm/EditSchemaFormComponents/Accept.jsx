import { fileTypes } from "../../../../../constants";
import Select from "../../../../ui/Select";

const Accept = ({ formData, updateFormData }) => {

    const fileSelectChange = (e) => {
        const newAcceptValue = Array.from(e.target.selectedOptions, (option) => option?.value);
        const newFormData = { ...formData, "accept": newAcceptValue }
        updateFormData(newFormData)
    };

    return (
        <>
            {formData.type === "file" && <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Accept</label>
                <Select
                    name="accept"
                    value={formData.accept}
                    placeholder="Select File Type"
                    options={fileTypes}
                    handleChange={fileSelectChange}
                    multiple={true}
                />
            </div>}
        </>
    );
};

export default Accept;