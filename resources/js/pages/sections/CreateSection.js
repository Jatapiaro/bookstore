import React, { Component } from 'react';
import SectionForm from '../../components/forms/SectionForm';
import Section from '../../models/Section';
import { toast } from 'react-toastify';

export default class CreateSection extends Component {

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
        this.props.roomService.index()
            .then(res => {
                let section = this.state.section;
                section.room_id = res[0].id;
                this.setState({rooms: res, section: section});
            })
            .catch(err => {
                toast.error('¡Operación fallida!, inténtalo nuevamente');
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
        this.props.sectionService.store(this.state.section)
            .then(res => {
                toast.success('¡La sección ha sido creada!');
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
                <SectionForm formSubmitButtonText="Crear Sección"
                    getError={this.getError}
                    handleSubmit={this.handleSubmit}
                    handleValueChange={this.handleValueChange}
                    rooms={this.state.rooms}
                    section={this.state.section} />
            </div>
        );
    }

}
