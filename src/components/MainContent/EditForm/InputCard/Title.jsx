import { memo } from "react";
import Icon from "../../../ui/Icon";

const Title = ({ label, editSchema, removeSchema }) => {
    return (
        <div className="mb-2 flex justify-between items-center gap-2 border-b border-b-slate-300 pb-3">
            <div className="font-medium text-[18px] text-slate-700 h-fit">Label : {label}</div>
            <div className="flex gap-2">
                <Icon icon="edit" helperText="Edit Schema" onClick={editSchema} />
                <Icon icon="delete" helperText="Remove Schema" onClick={removeSchema} />
            </div>
        </div>
    );
};

export default memo(Title);