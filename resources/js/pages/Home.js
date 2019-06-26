import React, { Component } from 'react';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h4>¡Bienvenido!</h4><br />
                Este es el administrador de la base de datos de libros.<br />
                Además de administrar los libros podras hacer las operaciones CRUD para las demás entidades.<br />
                ¡Selecciona en el menú la entidad en la que estes interesado y explora las posibilidades!
            </div>
        );
    }

}
