import React, { Component } from 'react';
import { Button, Card } from "tabler-react";
import { withRouter } from 'react-router-dom';


class CardHeader extends Component {

    redirectTo = () => {
        this.props.history.push(this.props.redirectLink);
    }

    render() {
        return (
            <div>
                <Card.Header>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Options>
                        <Button.List >
                            {
                                this.props.redirectLink &&
                                <Button onClick={this.redirectTo}
                                    color="primary"
                                    icon="plus"
                                    size="sm">
                                    Agregar
                                </Button>
                            }
                        </Button.List>
                    </Card.Options>
                </Card.Header>
            </div>
        )
    }

}

CardHeader.defaultProps = {
    "title": "",
    "redirectLink": undefined
}

export default withRouter(CardHeader)
