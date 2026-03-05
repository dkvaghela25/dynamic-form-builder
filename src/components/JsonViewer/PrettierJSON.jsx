import { useFormSchema } from "../../contexts/formSchemaContext";

const PrettierJSON = () => {

  const formSchema = useFormSchema();

  return (
    <pre className="p-3 pr-0 box-border w-full max-h-[80vh] break-all overflow-x-auto overflow-y-auto">
      {JSON.stringify(formSchema, null, 1)}
    </pre>
  );
  
};

export default PrettierJSON;