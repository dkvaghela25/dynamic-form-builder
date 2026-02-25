import { DevTool } from "@hookform/devtools";
import JsonEditor from "./components/JsonEditor";
import LivePreview from "./components/LivePreview";
import { FormProvider, useForm } from "react-hook-form";

const App = () => {

  const methods = useForm({
    defaultValues : {}
  });

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 px-4 py-6 md:px-8 md:py-10">
    <div className="mx-auto flex w-full max-w-[1280px] gap-6 lg:gap-8">
    <JsonEditor />
    <FormProvider {...methods}>
        <LivePreview /> 
    </FormProvider>
    </div>
    <DevTool control={methods.control} />
  </div>
  );
};

export default App;