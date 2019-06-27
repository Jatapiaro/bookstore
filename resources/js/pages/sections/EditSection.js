import React, { Component } from 'react';
import SectionForm from '../../components/forms/SectionForm';
import Section from '../../models/Section';
import { toast } from 'react-toastify';

export default class EditSection extends Component {

    state = {
        section: new Section(),
        rooms: [],
        errors: {}
    };

    constructor(props) {
        super(props);
    }

    /**
     * Executed before the page is rendered
     */
    componentWillMount() {
        let id = this.props.match.params.id;
        Promise.all([this.props.sectionService.show(id), this.props.roomService.index()])
            .then(res => {
                let section = new Section();
                section.fillFromResponse(res[0]);
                this.setState({
                    section: section,
                    rooms: res[1]
                });
            })
            .catch(err => {
                toast.error('¡Solicitud Fallida! Inténtalo Nuevamente');
            });
    }

    /**
     * Return an error given a key
     * @param key or name of the error
     */
    getError = (key) => {
        key = `section.${key}`;
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
        this.props.sectionService.update(this.state.section)
            .then(res => {
                toast.success('¡La sección ha sido actualizada!');
                this.props.history.push('/sections');
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
        let section = this.state.section;
        section[e.target.name] = e.target.value;
        this.setState({ section: section });
    }

    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <SectionForm formSubmitButtonText="Editar Sección"
                    getError={this.getError}
                    handleSubmit={this.handleSubmit}
                    handleValueChange={this.handleValueChange}
                    rooms={this.state.rooms}
                    section={this.state.section} />
            </div>
        );
    }

}
