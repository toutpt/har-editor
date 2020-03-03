import React from 'react';
import { TextField } from 'office-ui-fabric-react';
import { Modal } from '../Modal';
import { useService } from 'use-service';

export function EditForm(props) {
    const $edit = useService('$edit');
    const data = $edit.item;
    if (!data) {
        return null;
    }
    const req = data.request;
    const res = data.response;
    return (
        <Modal show={$edit.show}>
            <Modal.Header>Edit form</Modal.Header>
                <form noValidate>
                    <fieldset>
                        <legend>request</legend>
                        <TextField label="Method" value={req.method} />
                        <TextField label="URL" value={req.url} />
                        {/* TODO: headers, queryString and cookies */}
                    </fieldset>
                    <fieldset>
                        <legend>response</legend>
                        <TextField label="Status" value={res.status} />
                        <TextField label="StatusText" value={res.statusText} />
                        <TextField label="httpVersion" value={res.httpVersion} />
                        <TextField label="content.size" value={res.content.size} type="number" />
                        <TextField label="mimeType" value={res.content.mimeType} />
                        {/* TODO: headers, queryString and cookies */}
                    </fieldset>
                </form>
            <Modal.Footer>Submit</Modal.Footer>
        </Modal>
    );
}