import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Components
import Navbar from './Navbar/Navbar';

// Home
import Home from '../pages/Home';

// Services
import HttpService from '../services/HttpService';
import RoomService from '../services/RoomService';

// Toast
import { ToastContainer } from 'react-toastify';
import Rooms from '../pages/rooms/Rooms';

export default class Wrapper extends Component {

    constructor(props) {
        super(props);
        // Define your singleton services here
        this.httpService = new HttpService();
        this.roomService = new RoomService(this.httpService);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <BrowserRouter>
                    <div className="content">
                        <Switch>

                            <Route path="/"
                                render={(props) =>
                                    <Home
                                        {...props}
                                    />
                                }
                                exact={true} />

                            {/* ============= Rooms =========== */}
                            <Route path="/rooms"
                                render={(props) =>
                                    <Rooms
                                        {...props}
                                        roomService={this.roomService}
                                    />
                                }
                                exact={true} />

                        </Switch>
                    </div>
                </BrowserRouter>
                <ToastContainer />
            </React.Fragment>
        );
    }

}

if (document.getElementById('app')) {
    ReactDOM.render(<Wrapper />, document.getElementById('app'));
}

