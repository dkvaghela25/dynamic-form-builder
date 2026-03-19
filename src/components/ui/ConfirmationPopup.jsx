import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

const ConfirmationPopup = ({ setSelectedId, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all flex flex-col items-center text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50 mb-6">
          <RiErrorWarningFill className="h-10 w-10 text-(--destructive)" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Are you sure?
        </h3>
        <p className="text-sm text-gray-500 mb-8 px-4 leading-relaxed">
          Are you sure you want to delete this row? This action cannot be undone.
        </p>

        <div className="flex w-full gap-3 mt-2">
          <button
            onClick={() => setSelectedId(null)}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl transition-all"
          >
            <AiOutlineClose className="w-4 h-4" />
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-(--destructive) rounded-xl transition-all shadow-sm outline-none "
          >
            <AiOutlineDelete className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
