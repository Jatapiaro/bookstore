import React, { Component } from 'react';
import { Button, Card, Form, Table } from "tabler-react";

// Components
import CardHeader from '../../components/CardHeader';
import TableHeader from '../../components/TableHeader';
import DeleteModal from '../../components/DeleteModal';
import Book from '../../models/Book';

import { toast } from 'react-toastify';
import moment from 'moment';

export default class ShowBook extends Component {

    state = {
        book: new Book(),
        authors: {},
        modal: {
            visible: false,
            entityMessage: 'el libro',
            book: new Book(),
            index: -1,
        },
        selectedAuthor: -1
    };

    constructor(props) {
        super(props);
        this.columns = ['ID', 'Nombre', ''];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        let id = this.props.match.params.id;
        Promise.all([this.props.bookService.show(id), this.props.authorService.index()])
            .then(res => {
                /**
                 * Fill book data
                 */
                let book = this.state.book;
                book.fillFromResponse(res[0]);
                /**
                 * Convert the array of authors
                 * to a HashMap of authors
                 * this will allow to hide the
                 * ones that the book already have
                 */
                let dictOfAuthors = {};
                res[1].map((a) =>
                    dictOfAuthors[a.id] = a
                );
                /**
                 * Iterate the book authors
                 * and hide them from the HashMap
                 * of authors
                 */
                book.authors.map((a) =>
                    dictOfAuthors[a.id].visible = false
                );
                this.setState({
                    book: book,
                    authors: dictOfAuthors
                });
            })
            .catch(err => {
                toast.error('¡Solicitud Fallida!, Inténtalo de nuevo');
            });
    }

    /**
     * Handles the change of the author select
     */
    handleValueChange = (e) => {
        let author = parseInt(e.target.value);
        this.setState({
            selectedAuthor: author
        });
    }

    /**
     * Handles the submit of an author
     */
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.selectedAuthor == -1) {
            toast.error('¡Selecciona un autor!');
            return;
        }
        this.props.bookService.author(this.state.book, this.state.selectedAuthor)
            .then(res => {
                let book = this.state.book;
                book.authors = res;
                let authors = this.state.authors;
                authors[this.state.selectedAuthor].visible = false;
                this.setState({
                    authors: authors,
                    book: book,
                    selectedAuthor: -1
                });
                toast.success('¡El autor ha sido añadido correctamente!');
            })
            .catch(err => {
                console.log(err);
                toast.error('¡Solicitud fallida!, Intentálo de nuevo');
            });
    }

    /**
     * Removes an author from this book
     */
    removeAuthor = (author) => {
        this.props.bookService.author(this.state.book, author, false)
            .then(res => {
                let book = this.state.book;
                book.authors = res;
                let authors = this.state.authors;
                authors[author].visible = true;
                this.setState({
                    authors: authors,
                    book: book,
                    selectedAuthor: -1
                });
                toast.success('¡El autor ha sido eliminado correctamente!');
            })
            .catch(err => {
                console.log(err);
                toast.error('¡Solicitud fallida!, Intentálo de nuevo');
            });
    }


    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <Card>
                    <CardHeader
                        title={`Libro: ${this.state.book.name}`}
                    />
                    <Card.Body>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <Form.Group label="Nombre">
                                    <Form.StaticText>
                                        {this.state.book.name}
                                    </Form.StaticText>
                                </Form.Group>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <Form.Group label="Número de Páginas">
                                    <Form.StaticText>
                                        {this.state.book.number_of_pages}
                                    </Form.StaticText>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <Form.Group label="Fecha de Salida">
                                    <Form.StaticText>
                                        {moment(this.state.book.release_date).format("DD-MM-YYYY")}
                                    </Form.StaticText>
                                </Form.Group>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <Form.Group label="Sección">
                                    <Form.StaticText>
                                        {
                                            `${this.state.book.section !== null ? `${this.state.book.section.id} - ${this.state.book.section.name}` : 'N/A'}`
                                        }
                                    </Form.StaticText>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group label="Autores" />
                        <Table>
                            <TableHeader cols={this.columns} />
                            <Table.Body>
                                {
                                    this.state.book.authors.map((a, i) =>
                                        <Table.Row key={`author-${i}`}>
                                            <Table.Col>
                                                {a.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {a.name}
                                            </Table.Col>
                                            <Table.Col>
                                                <Button type="button"
                                                    onClick={() => { this.removeAuthor(a.id) }}
                                                    icon="user-x"
                                                    color="danger">
                                                    Eliminar Autor
                                                </Button>
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Select
                                label="Añade un autor"
                                name="author_id"
                                onChange={this.handleValueChange}
                                value={this.state.selectedAuthor}>
                                <option value="-1">Selecciona un autor</option>
                                {
                                    Object.values(this.state.authors).map((a, i) => {
                                        return (
                                            a.visible == true &&
                                            <option key={i} value={a.id}>
                                                {a.name}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Select>
                            <div className="d-flex">
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="ml-auto">
                                    Añade el autor seleccionado
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}
