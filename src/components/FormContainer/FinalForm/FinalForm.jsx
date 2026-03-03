import { useFormSchema } from "../../../contexts/formSchemaContext";

const FinalForm = () => {

  const formSchema = useFormSchema();

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
      {formSchema.map((schema, index) => {
        return (
          <InputCard key={index} schema={schema} index={index} />
        )
      })}
    </div>
  );
};

export default FinalForm;