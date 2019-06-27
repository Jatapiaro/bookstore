import React, { Component } from 'react';
import AuthorForm from '../../components/forms/AuthorForm';
import Author from '../../models/Author';
import { toast } from 'react-toastify';

export default class EditAuthor extends Component {

    state = {
        author: new Author(),
        errors: {}
    };

    constructor(props) {
        super(props);
    }

    /**
     * Executed before the page loads
     */
    componentWillMount() {
        let id = this.props.match.params.id;
        this.props.authorService.show(id)
            .then(res => {
                let author = new Author();
                author.fillFromResponse(res);
                this.setState({ author: author });
            })
            .catch(err => {
                console.log(err);
                toast.error("¡Solicitud fallida!");
            });
    }

    /**
     * Return an error given a key
     * @param key or name of the error
     */
    getError = (key) => {
        key = `author.${key}`;
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
        this.props.authorService.update(this.state.author)
            .then(res => {
                toast.success('¡El autor ha sido actualizado!');
                this.props.history.push('/authors');
            })
            .catch(err => {
                console.log(err.errors);
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
        let author = this.state.author;
        author[e.target.name] = e.target.value;
        this.setState({ author: author });
    }

    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <AuthorForm formSubmitButtonText="Editar Autor"
                    getError={this.getError}
                    handleSubmit={this.handleSubmit}
                    handleValueChange={this.handleValueChange}
                    author={this.state.author} />
            </div>
        );
    }

}
