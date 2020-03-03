import React from "react";

import { Modal as ModalBase } from "office-ui-fabric-react/lib/Modal";
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import './Modal.css';
import { useHotkeys } from "react-hotkeys-hook";

const theme = getTheme();
export function Modal({ children, onClose, ...props }) {
    useHotkeys('esc', () => onClose && onClose());
    return (
        <ModalBase
            className="modal"
            {...props}
        >
            {children}
        </ModalBase>
    );
}

function ModalHeader(props) {
    return (
        <div className="modal-header" style={{ 'background-color': theme.palette.themePrimary, color: theme.palette.themeLight }}>
            {props.children}
        </div>
    );
}

function ModalFooter(props) {
    return (
        <div className="modal-footer">
            {props.children}
        </div>
    );
}
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
