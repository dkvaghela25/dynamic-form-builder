import { useFormSchema } from "../../contexts/formSchemaContext";
import PreviewForm from "./PreviewForm/PreviewForm";
import FinalForm from "./FinalForm/FinalForm";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const FormContainer = ({ editMode }) => {

    const formSchema = useFormSchema();

    const methods = useForm({
        defaultValues: {}
    });

    return (
        <FormProvider {...methods}>
            <form className="h-[stretch] flex flex-col gap-4">
                {formSchema.length === 0
                    ? <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-2xl font-semibold text-slate-600">Select an input type from the left panel</div>
                    : <>
                        {editMode
                            ? <PreviewForm />
                            : <FinalForm />
                        }
                    </>
                }
            </form>
            <DevTool control={methods.control} />
        </FormProvider>
    );
};

export default FormContainer;