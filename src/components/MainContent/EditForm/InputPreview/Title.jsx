import { memo } from "react";
import Icon from "../../../ui/Icon";

const Title = ({ type, editSchema, removeSchema }) => {
    return (
        <>
            <div className="font-medium text-[18px] text-slate-700 h-fit">Input Type : {type}</div>
            <div className="flex gap-2">
                <Icon icon="edit" helperText="Edit Schema" onClick={editSchema} />
                <Icon icon="delete" helperText="Remove Schema" onClick={removeSchema} />
            </div>
        </>
    );
};

export default memo(Title);