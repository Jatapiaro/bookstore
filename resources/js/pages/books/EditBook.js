import React, { Component } from 'react';
import BookForm from '../../components/forms/BookForm';
import Book from '../../models/Book';
import { toast } from 'react-toastify';
import moment from 'moment';

export default class EditBook extends Component {

    state = {
        book: new Book(),
        sections: [],
        errors: {}
    };

    constructor(props) {
        super(props);
    }

    /**
     * Called before the page is rendered
     */
    componentWillMount() {
        let id = this.props.match.params.id;
        Promise.all([this.props.bookService.show(id), this.props.sectionService.index()])
            .then(res => {
                let book = this.state.book;
                book.fillFromResponse(res[0]);
                this.setState({
                    book: book,
                    sections: res[1]
                });
            })
            .catch(err => {
                toast.error('¡Solicitud Fallida!, Inténtalo de nuevo');
            });
    }

    /**
     * Return an error given a key
     * @param key or name of the error
     */
    getError = (key) => {
        key = `book.${key}`;
        let response = null;
        if (this.state.errors[key]) {
            response = '';
            this.state.errors[key].forEach((message) => {
                response += ` ${message}`;
            });
        }
        return response;
    }

    /**
     * Handles the submit of the form
     *
     * @param e event
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const el = e.target.elements;
        let day = el['release_date[day]'].value;
        let month = el['release_date[month]'].value;
        let year = el['release_date[year]'].value;

        let section_id = parseInt(el['section_id'].value);

        let book = this.state.book;
        book.section_id = (section_id == -1) ? null : section_id;

        if (day != '' && month != '' && year != '') {
            let release_date = moment().year(year).month(month - 1).date(day);
            book.release_date = release_date.format('YYYY-MM-DD');
        }

        this.props.bookService.update(this.state.book)
            .then(res => {
                toast.success('¡El libro ha sido editado!');
                this.props.history.push('/books');
            })
            .catch(err => {
                this.setState({ errors: err.errors });
                toast.error("¡Solicitud fallida! revisa el formulario");
            });
    }

    /**
     * Handles the change of an input
     * and save it on the state
     *
     * @param e event
     */
    handleValueChange = (e) => {
        let book = this.state.book;
        book[e.target.name] = e.target.value;
        this.setState({ book: book });
    }

    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <BookForm formSubmitButtonText="Editar Libro"
                    getError={this.getError}
                    handleSubmit={this.handleSubmit}
                    handleValueChange={this.handleValueChange}
                    sections={this.state.sections}
                    edit={true}
                    book={this.state.book} />
            </div>
        );
    }

}
