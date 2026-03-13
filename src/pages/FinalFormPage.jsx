import { Navigate } from "react-router-dom";
import FinalForm from "../components/FinalForm/FinalForm"

const FinalFormPage = () => {

  const formSchema = JSON.parse(localStorage.getItem("formSchema"));
  if (!formSchema || formSchema.length === 0) return <Navigate to="/" replace />

  return (
    <div className="m-auto bg-white font-sans! w-[40%] p-4 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h1 className="text-3xl font-semibold text-center text-[#030213] border-b border-slate-200 pb-4">Final Form</h1>
      <FinalForm formSchema={formSchema} />
    </div>
  );
};

export default FinalFormPage;

// export const colors = {
//     inputBg: "#F3F3F5",
//     buttonBg: "#030213"
// }