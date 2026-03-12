import { useState } from "react";
import { useFormSchema } from "../../../contexts/formSchemaContext";
import InputCard from "./InputCard/InputCard";

const EditForm = () => {

    const formSchema = useFormSchema();
    const [displayId, setDisplayId] = useState(false);

    const handleToggle = (index) => {
        setDisplayId(prev => prev === index ? false : index)
    }

    return (
        <>
            {formSchema.map((schema, index) => {
                return (
                    <InputCard key={index} displayId={displayId} handleToggle={handleToggle} schema={schema} index={index} />
                )
            })}
        </>
    );
};

export default EditForm;