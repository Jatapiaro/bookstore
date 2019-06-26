import React, { Component } from 'react';
import { Table } from 'tabler-react';

export default class TableHeader extends Component {

    render() {
        return (
            <Table.Header>
                {
                    this.props.cols.map((c, i) =>
                        <Table.ColHeader key={i}>
                            {c}
                        </Table.ColHeader>
                    )
                }
            </Table.Header>
        );
    }

}

TableHeader.defaultProps = {
    cols: []
}
