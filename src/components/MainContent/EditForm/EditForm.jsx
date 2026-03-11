import { useFormSchema } from "../../../contexts/formSchemaContext";
import InputCard from "./InputCard";

const EditForm = () => {

    const formSchema = useFormSchema();

    return (
        <>
            {formSchema.map((schema, index) => {
                return (
                    <InputCard key={index} schema={schema} index={index} />
                )
            })}
        </>
    );
};

export default EditForm;