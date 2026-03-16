import { Navigate } from "react-router-dom";
import FinalForm from "../components/FinalForm/FinalForm"

const FinalFormPage = () => {

  const formSchema = JSON.parse(localStorage.getItem("formSchema"));
  if (!formSchema || formSchema.length === 0) return <Navigate to="/" replace />

  return (
    <div className="m-auto bg-white font-sans! w-[45%] p-5 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex flex-col gap-1 mb-4">
        <div className="text-(--foreground) text-2xl font-semibold ">Configure Project Details</div>
        <div className="text-(--muted-foreground)">Complete the fields below to initialize the data structure.</div>
      </div>
      <FinalForm formSchema={formSchema} />
    </div>
  );
};

export default FinalFormPage;
