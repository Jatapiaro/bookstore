import React, { Component } from 'react';

export default class TopHeader extends Component {

    render() {
        return (
            <div>
                <div className="header py-4">
                    <div className="container">
                        <div className="d-flex">
                            <a className="header-brand" href="/">
                                {window.appName}
                            </a>
                            <div className="d-flex order-lg-2 ml-auto">
                            </div>

                            <a onClick={this.props.toggleCollapsedMenu} className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                                <span className="header-toggler-icon"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
