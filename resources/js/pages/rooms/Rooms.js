import React, { Component } from 'react';
import { Card, Dropdown, Table } from "tabler-react";

// Components
import CardHeader from './../../components/CardHeader';
import TableHeader from '../../components/TableHeader';
import DeleteModal from '../../components/DeleteModal';
import Room from '../../models/Room';

import { toast } from 'react-toastify';

export default class Rooms extends Component {

    state = {
        rooms: [],
        modal: {
            visible: false,
            entityMessage: 'la sala',
            room: new Room(),
            index: -1,
        }
    };

    constructor(props) {
        super(props);
        this.columns = ['ID', 'Nombre', 'Metros', ''];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        this.props.roomService.index()
            .then(res => {
                this.setState({rooms: res});
            })
            .catch(err => {
                toast.error("¡Solicitud fallida!");
            });
    }

    /**
     * Goes to edit view
     */
    goToEditView = (id) => {
        this.props.history.push(`rooms/${id}/edit`);
    }


    /**
     * Closes the opened modal
     */
    handleCancelDelete = () => {
        let modal = this.state.modal;
        modal.visible = false;
        this.setState({modal: modal});
    }

    /**
     * Aproves the element deletion
     */
    handleConfirmDelete = () => {
        this.props.roomService.delete(this.state.modal.room)
            .then(res => {
                let rooms = this.state.rooms;
                rooms.splice(this.state.modal.index, 1);
                this.setState({rooms: rooms});
                toast.success('La sala se ha eliminado!');
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
        modal.room = new Room();
        this.setState({ modal: modal });
    }

    /**
     * Opens the closed modal
     *
     * @param index index of the modal
     */
    openDeleteModal = (index) => {
        let modal = this.state.modal;
        let room = this.state.rooms[index];
        modal.room = room;
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
                        title={"Salas"}
                        redirectLink={"/rooms/create"}
                    />
                    <Card.Body>
                        <Table>
                            <TableHeader cols={this.columns}/>
                            <Table.Body>
                                {
                                    this.state.rooms.map((r, i) =>
                                        <Table.Row key={`room-${i}`}>
                                            <Table.Col>
                                                {r.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {r.name}
                                            </Table.Col>
                                            <Table.Col>
                                                {r.meters}
                                            </Table.Col>
                                            <Table.Col>
                                                <Dropdown
                                                    type="button"
                                                    color="success"
                                                    triggerContent="Acciones"
                                                    items={[
                                                        <Dropdown.Item
                                                            key={1}
                                                            onClick={() => this.goToEditView(r.id)}>
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
                        <strong>ID</strong> {this.state.modal.room.id || ''}
                    </p>
                    <p>
                        <strong>Nombre</strong> {this.state.modal.room.name || ''}
                    </p>
                </DeleteModal>
            </div>
        );
    }

}
