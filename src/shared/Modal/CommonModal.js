import React, { Fragment } from 'react';
import { Modal } from "react-bootstrap";

const SimpleModal = (props) => {
    return (        
        <Fragment>
            <Modal className="modal-min" show={props.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div className="modal-header">
                    <h1>{props.Heading}</h1>
                    <button type="button" className="close" onClick={props.handleClose}><span aria-hidden="true">×</span></button>
                </div>
                <Modal.Body className="text-center">
                     {props.children}
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default SimpleModal
