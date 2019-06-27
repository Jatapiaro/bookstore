import React, { Component } from 'react';
import { Button, Card, Form } from "tabler-react";
import CardHeader from '../CardHeader';
import CardCancelButton from '../CardCancelButton';

export default class RoomForm extends Component {

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
                                value={this.props.author.name}
                                onChange={this.props.handleValueChange}
                                error={this.props.getError('name')}
                            />
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
