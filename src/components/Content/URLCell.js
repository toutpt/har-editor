import React from "react";
// import { PrimaryButton } from "office-ui-fabric-react";

export function renderURL(item) {
    return (
        <div>
            {item.request.method}
            {/* <div className="url-cell">
                <PrimaryButton
                    name="edit"
                    iconProps={{ iconName: 'Edit' }}
                    onClick={() => $edit.edit(item)}
                />
            </div> */}
        </div>
    );
}