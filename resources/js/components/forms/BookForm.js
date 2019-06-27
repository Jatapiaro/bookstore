import React, { Component } from 'react';
import { Button, Card, Form } from "tabler-react";
import CardHeader from '../CardHeader';
import CardCancelButton from '../CardCancelButton';
import Datepicker from '../Datepicker';

export default class BookForm extends Component {

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
                                value={this.props.book.name}
                                onChange={this.props.handleValueChange}
                                error={this.props.getError('name')}
                            />
                        </Form.Group>
                        <Form.Group
                            label="Número de Páginas"
                            isRequired={true}>
                            <Form.Input
                                name="number_of_pages"
                                value={this.props.book.number_of_pages}
                                onChange={this.props.handleValueChange}
                                error={this.props.getError('number_of_pages')}
                            />
                        </Form.Group>
                        <Form.Group
                            label="Fecha de Salida"
                            isRequired={true}>
                            <Datepicker
                                edit={this.props.edit}
                                defaultDate={this.props.book.release_date}
                                dayName="release_date[day]"
                                monthName="release_date[month]"
                                yearName="release_date[year]"
                                error={this.props.getError('release_date')}
                            />
                        </Form.Group>
                        <Form.Group label="Sección">
                            <Form.Select
                                name="section_id"
                                onChange={this.props.handleValueChange}
                                value={this.props.book.section_id}>
                                <option value="-1">Selecciona una Sección</option>
                                {
                                    this.props.sections.map((s, i) =>
                                        <option key={i} value={s.id}>
                                            {`${s.id} - ${s.name}`}
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

BookForm.defaultProps = {
    sections: []
}
