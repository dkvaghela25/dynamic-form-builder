import { lazy } from "react";
import { useFormSchema } from "../../contexts/formSchemaContext";
import PreviewForm from "./PreviewForm/PreviewForm";
import FinalForm from "./FinalForm/FinalForm";
import { FormProvider, useForm } from "react-hook-form";

const DevTool = lazy(() =>
    import('@hookform/devtools').then(module => ({ default: module.DevTool }))
);

const FormContainer = ({ editMode }) => {

    const formSchema = useFormSchema();

    const methods = useForm({
        mode: "onBlur",
        defaultValues: {}
    });

    return (
        <>
            {formSchema.length === 0
                ? <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-2xl font-semibold text-slate-600">Select an input type from the left panel</div>
                : <FormProvider {...methods}>
                    <form className="h-[stretch] flex flex-col gap-4">
                        {editMode
                            ? <PreviewForm />
                            : <FinalForm />
                        }
                    </form>
                    <DevTool control={methods.control} devToolsConfig={{ store: false }} />
                </FormProvider>
            }
        </>
    );
};

export default FormContainer;