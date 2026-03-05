import { memo } from "react";
import Icon from "../../../ui/Icon";

const Actions = ({ text, index, handleEdit, handleDelete }) => {
    return (
        <div className="flex justify-center items-center border-t border-slate-200 gap-5 p-1">
            <Icon helperText={`Edit ${text}`} icon="edit" onClick={(e) => handleEdit(e, index)} />
            <Icon helperText={`Remove ${text}`} icon="delete" onClick={(e) => handleDelete(e, index)} />
        </div>
    );
};

export default memo(Actions);