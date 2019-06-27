import React, { Component } from 'react';
import { Card, Dropdown, Table } from "tabler-react";

// Components
import CardHeader from './../../components/CardHeader';
import TableHeader from '../../components/TableHeader';
import DeleteModal from '../../components/DeleteModal';
import Author from '../../models/Author';

import { toast } from 'react-toastify';

export default class Authors extends Component {

    state = {
        authors: [],
        modal: {
            visible: false,
            entityMessage: 'al autor',
            author: new Author(),
            index: -1,
        }
    }

    constructor(props) {
        super(props);
        this.columns = ['ID', 'Nombre', 'Libros Escritos', ''];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        this.props.authorService.index()
            .then(res => {
                this.setState({ authors: res });
            })
            .catch(err => {
                toast.error("¡Solicitud fallida!");
            });
    }

    /**
     * Goes to edit view
     */
    goToEditView = (id) => {
        this.props.history.push(`authors/${id}/edit`);
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
        this.props.authorService.delete(this.state.modal.author)
            .then(res => {
                let authors = this.state.authors;
                authors.splice(this.state.modal.index, 1);
                this.setState({ authors: authors });
                toast.success('El autor se ha eliminado!');
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
        modal.author = new Author();
        this.setState({ modal: modal });
    }

    /**
     * Opens the closed modal
     *
     * @param index index of the modal
     */
    openDeleteModal = (index) => {
        let modal = this.state.modal;
        let author = this.state.authors[index];
        modal.author = author;
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
                        title={"Autores"}
                        redirectLink={"/authors/create"}
                    />
                    <Card.Body>
                        <Table>
                            <TableHeader cols={this.columns} />
                            <Table.Body>
                                {
                                    this.state.authors.map((a, i) =>
                                        <Table.Row key={`author-${i}`}>
                                            <Table.Col>
                                                {a.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {a.name}
                                            </Table.Col>
                                            <Table.Col>
                                                {a.books.length}
                                            </Table.Col>
                                            <Table.Col>
                                                <Dropdown
                                                    type="button"
                                                    color="success"
                                                    triggerContent="Acciones"
                                                    items={[
                                                        <Dropdown.Item
                                                            key={1}
                                                            onClick={() => this.goToEditView(a.id)}>
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
                        <strong>ID</strong> {this.state.modal.author.id || ''}
                    </p>
                    <p>
                        <strong>Nombre</strong> {this.state.modal.author.name || ''}
                    </p>
                </DeleteModal>
            </div>
        );
    }

}
