import React, { Component } from 'react';
import { Button, Card, Form } from "tabler-react";
import CardHeader from '../CardHeader';
import CardCancelButton from '../CardCancelButton';

export default class SectionForm extends Component {

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Card>
                    <CardHeader title={this.props.formSubmitButtonText} />
                    <Card.Body>
                        <Form.Group
                            label="Nombre"
                            isRequired={true}>
                            <Form.Input
                                name="name"
                                value={this.props.section.name}
                                onChange={this.props.handleValueChange}
                                error={this.props.getError('name')}
                            />
                        </Form.Group>
                        <Form.Group label="Sala" isRequired={true}>
                            <Form.Select
                                name="room_id"
                                onChange={this.props.handleValueChange}
                                value={this.props.section.room_id}>
                                {
                                    this.props.rooms.map((r, i) =>
                                        <option key={i} value={r.id}>
                                            {`${r.id} - ${r.name}`}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex">
                            <CardCancelButton />
                            <Button
                                type="submit"
                                color="primary"
                                className="ml-auto">
                                {this.props.formSubmitButtonText}
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>
        );
    }

}

SectionForm.defaultProps = {
    rooms: []
}
