
import { useContext } from "react";
import { availableInputs } from "../utils/availableInputs";
import { FormSchemaContext } from "../contexts/formSchemaContext";

const JsonEditor = () => {

    const { setFormSchema } = useContext(FormSchemaContext);;

    const addInput = (key, value) => {
        setFormSchema(prev => [...prev, {
            type: key,
            label: value,
            placeholder : "",
            name : "",
            value : "",
            validationRules : {
                required : false
            }
        }])
    }

    return (
        <div
            className="w-[15%] fixed bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col border border-gray-500 cursor-pointer"
        >
            {Object.entries(availableInputs).map(([key, value]) => {
                return <div onClick={() => addInput(key, value)} className="capitalize" key={key}>
                    <div className="p-2">{value}</div>
                    <hr className="border-gray-500" />
                </div>
            })}
        </div>
    );
};

export default JsonEditor;