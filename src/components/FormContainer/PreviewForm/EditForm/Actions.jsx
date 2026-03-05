import { memo } from "react";
import Icon from "../../../ui/Icon";

const Actions = ({ type, editRule, removeRule }) => {
    return (
        <div className="flex justify-center items-center border-t border-slate-200 gap-5">
            {type !== "required" &&
                <>
                    <Icon helperText="Edit Rule" icon="edit" onClick={(e) => editRule(e, type)} />
                    <Icon helperText="Remove Rule" icon="delete" onClick={(e) => removeRule(e, type)} />
                </>
            }
        </div>
    );
};

export default memo(Actions);