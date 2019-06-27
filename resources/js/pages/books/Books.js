import React, { Component } from 'react';
import { Card, Dropdown, Table } from "tabler-react";

// Components
import CardHeader from './../../components/CardHeader';
import TableHeader from '../../components/TableHeader';
import DeleteModal from '../../components/DeleteModal';
import Book from '../../models/Book';

import { toast } from 'react-toastify';
import moment from 'moment';

export default class Books extends Component {

    state = {
        books: [],
        modal: {
            visible: false,
            entityMessage: 'el libro',
            book: new Book(),
            index: -1,
        }
    };

    constructor(props) {
        super(props);
        this.columns = [
            'ID',
            'Nombre',
            '# de Páginas',
            'Fecha de Salida',
            'Autores',
            'Sección',
            ''
        ];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        this.props.bookService.index()
            .then(res => {
                this.setState({ books: res });
            })
            .catch(err => {
                toast.error("¡Solicitud fallida!");
            });
    }

    /**
     * Goes to edit view
     */
    goToEditView = (id, edit = true) => {
        if (edit) {
            this.props.history.push(`books/${id}/edit`);
        } else {
            this.props.history.push(`books/${id}`);
        }
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
        this.props.bookService.delete(this.state.modal.book)
            .then(res => {
                let books = this.state.books;
                books.splice(this.state.modal.index, 1);
                this.setState({ books: books });
                toast.success('El libro se ha eliminado!');
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
        modal.book = new Book();
        this.setState({ modal: modal });
    }

    /**
     * Opens the closed modal
     *
     * @param index index of the modal
     */
    openDeleteModal = (index) => {
        let modal = this.state.modal;
        let book = this.state.books[index];
        modal.book = book;
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
                        title={"Libros"}
                        redirectLink={"/books/create"}
                    />
                    <Card.Body>
                        <Table>
                            <TableHeader cols={this.columns} />
                            <Table.Body>
                                {
                                    this.state.books.map((b, i) =>
                                        <Table.Row key={`book-${i}`}>
                                            <Table.Col>
                                                {b.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {b.name}
                                            </Table.Col>
                                            <Table.Col>
                                                {b.number_of_pages}
                                            </Table.Col>
                                            <Table.Col>
                                                {moment(b.release_date).format("DD-MM-YYYY")}
                                            </Table.Col>
                                            <Table.Col>
                                                {
                                                    b.authors.map((a) => a.name).join(', ')
                                                }
                                            </Table.Col>
                                            <Table.Col>
                                                {
                                                    `${b.section !== null ?
                                                    `${b.section.id} - ${b.section.name}`
                                                    : 'N/A'}`
                                                }
                                            </Table.Col>
                                            <Table.Col>
                                                <Dropdown
                                                    type="button"
                                                    color="success"
                                                    triggerContent="Acciones"
                                                    items={[
                                                        <Dropdown.Item
                                                            key={1}
                                                            onClick={() => this.goToEditView(b.id, false)}>
                                                            <i className="fe fe-eye" />
                                                            <span> Ver</span>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item
                                                            key={2}
                                                            onClick={() => this.goToEditView(b.id)}>
                                                            <i className="fe fe-edit-2" />
                                                            <span> Editar</span>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item
                                                            key={3}
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
                        <strong>ID</strong> {this.state.modal.book.id || ''}
                    </p>
                    <p>
                        <strong>Nombre</strong> {this.state.modal.book.name || ''}
                    </p>
                </DeleteModal>
            </div>
        );
    }

}
