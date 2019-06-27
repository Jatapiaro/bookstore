import React, { Component } from 'react';
import TopHeader from './TopHeader';
import Menu from './Menu';
import NavLink from '../../models/NavLink';

export default class Navbar extends Component {

    state = {
        isCollapsedMenuOpen: false
    }

    constructor(props) {
        super(props);
        this.navlinks = [
            new NavLink('Home', 'fa fa-home', '/', true),
            new NavLink('Autores', 'fa fa-users', '/authors'),
            new NavLink('Salas', 'fa fa-bank', '/rooms'),
        ];
    }

    toggleCollapsedMenu = () => {
        this.setState((prevState) => {
            return {
                isCollapsedMenuOpen: !prevState.isCollapsedMenuOpen
            }
        })
    }

    render() {

        return (
            <React.Fragment>
                <TopHeader
                    toggleCollapsedMenu={this.toggleCollapsedMenu} />
                <Menu
                    navlinks={this.navlinks}
                    isCollapsedMenuOpen={this.state.isCollapsedMenuOpen} />
            </React.Fragment>
        );

    }

}
