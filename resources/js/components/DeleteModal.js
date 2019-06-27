import React, { Component } from 'react';
import Modal, { ConfirmModal } from 'react-bootstrap4-modal';

export default class DeleteModal extends Component {

    render() {
        return (
            <Modal
                visible={this.props.modal.visible}
                onClickBackdrop={this.handleCancelDelete}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        {`¿Estás seguro de eliminar ${this.props.modal.entityMessage}?`}
                    </h5>
                </div>
                <div className="modal-body">
                    {
                        this.props.children
                    }
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.props.handleCancelDelete}>
                        Cancelar
                        </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.props.handleConfirmDelete}>
                        Sí, eliminar.
                        </button>
                </div>
            </Modal>
        );
    }

}

DeleteModal.defaultProps = {

    modal: {
        visible: false,
        entityMessage: `la entrada`
    }

}
