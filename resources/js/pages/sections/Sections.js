import React, { Component } from 'react';
import { Card, Dropdown, Table } from "tabler-react";

// Components
import CardHeader from './../../components/CardHeader';
import TableHeader from '../../components/TableHeader';
import DeleteModal from '../../components/DeleteModal';
import Section from '../../models/Section';

import { toast } from 'react-toastify';

export default class Sections extends Component {

    state = {
        sections: [],
        modal: {
            visible: false,
            entityMessage: 'la sección',
            section: new Section(),
            index: -1,
        }
    };

    constructor(props) {
        super(props);
        this.columns = ['ID', 'Nombre', 'Perteneciente a la sala', ''];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        this.props.sectionService.index()
            .then(res => {
                this.setState({ sections: res });
            })
            .catch(err => {
                toast.error("¡Solicitud fallida!");
            });
    }

    /**
     * Goes to edit view
     */
    goToEditView = (id) => {
        this.props.history.push(`sections/${id}/edit`);
    }


    /**
     * Closes the opened modal
     */
    handleCancelDelete = () => {
        let modal = this.state.modal;
        modal.visible = false;
        this.setState({ modal: modal });
    }

    /**
     * Aproves the element deletion
     */
    handleConfirmDelete = () => {
        this.props.sectionService.delete(this.state.modal.section)
            .then(res => {
                let sections = this.state.sections;
                sections.splice(this.state.modal.index, 1);
                this.setState({ sections: sections });
                toast.success('La sección se ha eliminado!');
                this.resetModal();
            })
            .catch(err => {
                toast.error('¡Operación fallida!');
                this.resetModal();
            });
    }

    /**
     * Resets the modal to the original state
     */
    resetModal = () => {
        let modal = this.state.modal;
        modal.visible = false;
        modal.index = -1;
        modal.section = new Section();
        this.setState({ modal: modal });
    }

    /**
     * Opens the closed modal
     *
     * @param index index of the modal
     */
    openDeleteModal = (index) => {
        let modal = this.state.modal;
        let section = this.state.sections[index];
        modal.section = section;
        modal.visible = true;
        modal.index = index;
        this.setState({ modal: modal });
    }

    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <Card>
                    <CardHeader
                        title={"Secciones"}
                        redirectLink={"/sections/create"}
                    />
                    <Card.Body>
                        <Table>
                            <TableHeader cols={this.columns} />
                            <Table.Body>
                                {
                                    this.state.sections.map((s, i) =>
                                        <Table.Row key={`section-${i}`}>
                                            <Table.Col>
                                                {s.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {s.name}
                                            </Table.Col>
                                            <Table.Col>
                                                {`${s.room.id} - ${s.room.name}`}
                                            </Table.Col>
                                            <Table.Col>
                                                <Dropdown
                                                    type="button"
                                                    color="success"
                                                    triggerContent="Acciones"
                                                    items={[
                                                        <Dropdown.Item
                                                            key={1}
                                                            onClick={() => this.goToEditView(s.id)}>
                                                            <i className="fe fe-edit-2" />
                                                            <span> Editar</span>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item
                                                            key={2}
                                                            onClick={() => this.openDeleteModal(i)}>
                                                            <i className="fe fe-trash-2" />
                                                            <span> Borrar</span>
                                                        </Dropdown.Item>
                                                    ]}
                                                />
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </Card.Body>
                </Card>
                <DeleteModal
                    modal={this.state.modal}
                    handleCancelDelete={this.handleCancelDelete}
                    handleConfirmDelete={this.handleConfirmDelete}>
                    <p>
                        <strong>ID</strong> {this.state.modal.section.id || ''}
                    </p>
                    <p>
                        <strong>Nombre</strong> {this.state.modal.section.name || ''}
                    </p>
                </DeleteModal>
            </div>
        );
    }

}
