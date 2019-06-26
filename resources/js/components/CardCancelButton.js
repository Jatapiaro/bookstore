import React from 'react';
import { Button } from "tabler-react";
import { withRouter } from 'react-router-dom'

class CardCancelButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    type="button"
                    link
                    onClick={this.handleCancel}>
                    Cancelar
                </Button>
            </React.Fragment>
        )
    }

    handleCancel() {
        this.props.history.goBack();
    }
}

export default withRouter(CardCancelButton)
