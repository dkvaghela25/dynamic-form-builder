import { datePickerTypes, textInputs } from "../../../../../../constants";
import Select from "../../../../../ui/Select";

const Type = ({ formData, updateFormData }) => {

    const { type } = formData;

    const handleTypeChange = (e) => {
        const { value } = e.target;

        let newValue = "";

        const availableRules = (() => {
            switch (value) {
                case "text": return ["minLength", "maxLength", "pattern"];
                case "number": return ["min", "max"];
                case "password": return ["minLength", "maxLength", "pattern"];
                case "email": return ["pattern"];
                case "color": return undefined;
                case "date": return ["minDate", "maxDate"];
                case "datetime-local": return ["minDateTime", "maxDateTime"];
                case "date-range": {
                    newValue = {
                        startDate: "",
                        endDate: "",
                    }
                    return ["minStartDate", "maxStartDate", "dateRange"];
                };
            }
        })();

        const newFormData = {
            ...formData,
            type: value,
            value: newValue,
            validationRules: [{ "type": "required", "value": false }],
            availableRules
        }

        updateFormData(newFormData)
    }

    return (
        <>
            {textInputs.includes(type) &&
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Input Type</label>
                    <Select
                        name="type"
                        value={type}
                        placeholder="Select Input Type"
                        options={textInputs}
                        handleChange={handleTypeChange}
                        multiple={false}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                </div>
            }

            {datePickerTypes.includes(type) &&
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Input Type</label>
                    <Select
                        name="type"
                        value={type}
                        placeholder="Select Input Type"
                        options={datePickerTypes}
                        handleChange={handleTypeChange}
                        multiple={false}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                </div>
            }
        </>
    );
};

export default Type;