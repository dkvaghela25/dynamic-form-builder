import { memo } from "react";
import Icon from "./Icon";

const Actions = ({ text, index, handleEdit, handleDelete }) => {
    return (
        <div className="flex justify-center items-center gap-5 p-1">
            <Icon helperText={text ? `Edit ${text}` : ""} icon="edit" onClick={(e) => handleEdit(e, index)} />
            <Icon helperText={text ? `Remove ${text}` : ""} icon="delete" onClick={(e) => handleDelete(e, index)} />
        </div>
    );
};

export default memo(Actions);