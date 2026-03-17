import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "../../utils/getDefaultValues";
import { DevTool } from "@hookform/devtools";
import InputController from "./InputController";

const FinalForm = ({ formSchema }) => {

    const defaultValues = getDefaultValues(formSchema);

    console.log(formSchema);
    console.log(defaultValues);

    const methods = useForm({
        defaultValues,
    });

    return (
        <>
            <FormProvider {...methods}>
                <form action="">
                    {formSchema.map(schema => {
                        return <InputController schema={schema} />
                    })}
                </form>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
};

export default FinalForm;