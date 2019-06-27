import React, { Component } from 'react';
import RoomForm from '../../components/forms/RoomForm';
import Room from '../../models/Room';
import { toast } from 'react-toastify';

export default class CreateRoom extends Component {

    state = {
        room: new Room(),
        errors: {}
    };

    constructor(props) {
        super(props);
    }

    /**
     * Return an error given a key
     * @param key or name of the error
     */
    getError = (key) => {
        key = `room.${key}`;
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
        this.props.roomService.store(this.state.room)
            .then(res => {
                toast.success('¡La sala ha sido creada!');
                this.props.history.push('/rooms');
            })
            .catch(err => {
                console.log(err.errors);
                this.setState({errors: err.errors});
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
        let room = this.state.room;
        room[e.target.name] = e.target.value;
        this.setState({room: room});
    }

    /**
     * Renders the page content
     */
    render() {
        return (
            <div className="container">
                <RoomForm formSubmitButtonText="Crear Sala"
                    getError={this.getError}
                    handleSubmit={this.handleSubmit}
                    handleValueChange={this.handleValueChange}
                    room={this.state.room}/>
            </div>
        );
    }

}
