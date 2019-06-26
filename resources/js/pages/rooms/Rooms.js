import React, { Component } from 'react';
import { Button, Card, Dropdown, Table } from "tabler-react";

// Components
import CardHeader from './../../components/CardHeader';
import TableHeader from '../../components/TableHeader';

import { toast } from 'react-toastify';

export default class Rooms extends Component {

    state = {
        rooms: []
    }

    constructor(props) {
        super(props);
        this.columns = ['ID', 'Nombre', 'Metros', ''];
    }

    /**
     * Executes before the page is loaded
     */
    componentWillMount() {
        this.props.roomService.index()
            .then(res => {
                this.setState({rooms: res});
            })
            .catch(err => {
                toast.error("¡Solicitud fallida!");
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
                        title={"Salas"}
                        redirectLink={"/"}
                    />
                    <Card.Body>
                        <Table>
                            <TableHeader cols={this.columns}/>
                            <Table.Body>
                                {
                                    this.state.rooms.map((r, i) =>
                                        <Table.Row key={`room-${i}`}>
                                            <Table.Col>
                                                {r.id}
                                            </Table.Col>
                                            <Table.Col>
                                                {r.name}
                                            </Table.Col>
                                            <Table.Col>
                                                {r.meters}
                                            </Table.Col>
                                            <Table.Col>
                                                <Dropdown
                                                    type="button"
                                                    color="success"
                                                    triggerContent="Acciones"
                                                    items={[
                                                        <Dropdown.Item
                                                            key={1}
                                                            onClick={() => alert('Implementar edit')}>
                                                            <i className="fe fe-edit-2" />
                                                            <span> Editar</span>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item
                                                            key={2}
                                                            onClick={() => alert("Implementar delete")}>
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
            </div>
        );
    }

}
