import { useContext, useState } from "react";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import { useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";

const EditSchema = ({ schema, index, setEditMode }) => {

    const { unregister, setValue } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext)
    const [formData, setFormData] = useState({
        type: schema.type,
        label: schema.label,
        placeholder: schema.placeholder,
        name: schema.name,
        value: schema.value,
        validationRules: schema.validationRules
    })

    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            unregister(formData.name);
            setValue(value, formData.value);
        }

        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return formData;
                } else {
                    return currElem;
                }
            })
        })
        setEditMode(false);
    }

    return (
        <div className="flex flex-col gap-3">

            {Object.entries(formData).map(([key, value]) => {
                return (
                    <div className="flex flex-col gap-1" key={key}>
                        {(key !== "type" && key !== "validationRules") &&
                            <>
                                <label htmlFor="">{key}</label>
                                <input
                                    className="border rounded p-2 bg-white"
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </>
                        }
                    </div>
                )
            })}

            <ValidationRules validationRules={formData.validationRules} setFormData={setFormData} />

            <div className="flex gap-5 mt-3 ml-auto">
                <button className="bg-white text-black p-[10px_25px] rounded border font-semibold! cursor-pointer" onClick={() => setEditMode(false)}>Cancel</button>
                <button className="bg-gray-600 text-white p-[10px_25px] rounded font-semibold! cursor-pointer" onClick={handleFormSubmit}>Edit Schema</button>
            </div>
        </div>
    );
};

export default EditSchema;

const ValidationRules = ({ validationRules, setFormData }) => {

    const [rule, setRule] = useState("")
    const [value, setValue] = useState("")

    let availableRules = ["min", "max", "minLength", "maxLength", "pattern"];
    availableRules = availableRules.filter(rule => !(Object.keys(validationRules).includes(rule)));

    const addRule = (e) => {
        e.preventDefault();
        setFormData(prev => { return { ...prev, validationRules: { ...validationRules, [rule]: value } } })
        setRule("")
        setValue("")
    }
    
    const removeRule = (key) => {
        console.log(key);
        // eslint-disable-next-line no-unused-vars
        const updatedRules = Object.fromEntries(Object.entries(validationRules).filter(([currKey,currValue]) => currKey !== key))
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
        setRule("")
        setValue("")
    }

    return (
        <>
            <div className="p-5 flex flex-col gap-3 border rounded">
                <div className="text-xl">Validation Rules</div>

                <div className="grid grid-cols-3 w-[50%] m-auto">
                    <div className="font-extrabold border-b-2 p-2 text-center">Rule</div>
                    <div className="font-extrabold border-b-2 p-2 text-center">Value</div>
                    <div className="font-extrabold border-b-2 p-2 text-center"></div>
                    {Object.entries(validationRules).map(([key, value]) => {
                        return (
                            <>
                                <div className="border-b-2 p-2 text-center">{key}</div>
                                <div className="border-b-2 p-2 text-center">{value.toString()}</div>
                                <div className="border-b-2 p-2 text-center"> <MdDelete className="w-6 h-6 ml-auto cursor-pointer text-red-500" onClick={() => removeRule(key)} /> </div>


                            </>
                        )
                    })}
                </div>

                <div className="flex gap-3 items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={validationRules.required}
                        onChange={(e) => {
                            setFormData(prev => { return { ...prev, validationRules: { required: e.target.checked } } })
                        }}
                    />
                    <label htmlFor="">Required</label>
                </div>

                <div className="grid grid-cols-[3fr_3fr_1fr] gap-5 mt-3">


                    <select
                        className="border rounded p-2 bg-white"
                        name="rule"
                        value={rule}
                        onChange={(e) => {
                            setRule(e.target.value)
                        }}
                    >
                        <option value="">Select Rule</option>
                        {availableRules.map(rule => {
                            return <option key={rule} value={rule}>{rule}</option>
                        })}
                    </select>

                    <input
                        placeholder="Value (First select rule for defining it's value)"
                        disabled={!rule}
                        name="value"
                        onChange={e =>
                            setValue(rule !== "pattern" ? Number(e.target.value) : e.target.value)
                        }
                        value={value}
                        className="border rounded p-2 bg-white"
                        type={rule === "pattern" ? "text" : "number"}
                    />

                    <button onClick={addRule} className="bg-gray-600 text-white p-[10px_25px] rounded font-semibold! cursor-pointer"> Add</button>
                </div>
            </div>
        </>
    )
}