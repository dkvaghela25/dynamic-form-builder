import { useFormSchema } from "../../../contexts/formSchemaContext";
import InputCard from "./InputPreview/InputCard";

const PreviewForm = () => {

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

export default PreviewForm;