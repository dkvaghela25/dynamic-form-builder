import { useFormContext } from "react-hook-form";
import { useFormSchema } from "../../../contexts/formSchemaContext";
import InputField from "./InputField";

const FinalForm = () => {

  const formSchema = useFormSchema();
  const { handleSubmit } = useFormContext();

  const handleFormSubmit = async (data) => {
    alert(JSON.stringify(data, null, 2));
    console.log(data);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm flex flex-col gap-5">
      {
        formSchema.map((schema, index) => {
          return (
            <InputField key={index} schema={schema} index={index} />
          )
        })
      }
      <button
        onClick={handleSubmit(handleFormSubmit)}
        className="cursor-pointer rounded w-fit self-center bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Submit
      </button>
    </div>
  );
};

export default FinalForm;