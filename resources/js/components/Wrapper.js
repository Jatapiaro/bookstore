import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Components
import Navbar from './navbar/Navbar';

// Home
import Home from '../pages/Home';

// Authors
import Authors from '../pages/authors/Authors';
import CreateAuthor from '../pages/authors/CreateAuthor';
import EditAuthor from '../pages/authors/EditAuthor';

// Rooms
import Rooms from '../pages/rooms/Rooms';
import CreateRoom from '../pages/rooms/CreateRoom';
import EditRoom from '../pages/rooms/EditRoom';

// Sections
import Sections from '../pages/sections/Sections';
import CreateSection from '../pages/sections/CreateSection';
import EditSection from '../pages/sections/EditSection';

// Services
import HttpService from '../services/HttpService';
import AuthorService from '../services/AuthorService';
import RoomService from '../services/RoomService';
import SectionService from '../services/SectionService';

// Toast
import { ToastContainer } from 'react-toastify';

export default class Wrapper extends Component {

    constructor(props) {
        super(props);
        // Define your singleton services here
        this.httpService = new HttpService();
        this.authorService = new AuthorService(this.httpService);
        this.roomService = new RoomService(this.httpService);
        this.sectionService = new SectionService(this.httpService);
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

                            {/* ============= Authors =========== */}
                            <Route path="/authors"
                                render={(props) =>
                                    <Authors
                                        {...props}
                                        authorService={this.authorService}
                                    />
                                }
                                exact={true} />
                            <Route path="/authors/create"
                                render={(props) =>
                                    <CreateAuthor
                                        {...props}
                                        authorService={this.authorService}
                                    />
                                }
                                exact={true} />
                            <Route path="/authors/:id/edit"
                                render={(props) =>
                                    <EditAuthor
                                        {...props}
                                        authorService={this.authorService}
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
                            <Route path="/rooms/create"
                                render={(props) =>
                                    <CreateRoom
                                        {...props}
                                        roomService={this.roomService}
                                    />
                                }
                                exact={true} />
                            <Route path="/rooms/:id/edit"
                                render={(props) =>
                                    <EditRoom
                                        {...props}
                                        roomService={this.roomService}
                                    />
                                }
                                exact={true} />

                            {/* ============= Sections =========== */}
                            <Route path="/sections"
                                render={(props) =>
                                    <Sections
                                        {...props}
                                        sectionService={this.sectionService}
                                    />
                                }
                                exact={true} />
                            <Route path="/sections/create"
                                render={(props) =>
                                    <CreateSection
                                        {...props}
                                        roomService={this.roomService}
                                        sectionService={this.sectionService}
                                    />
                                }
                                exact={true} />
                            <Route path="/sections/:id/edit"
                                render={(props) =>
                                    <EditSection
                                        {...props}
                                        roomService={this.roomService}
                                        sectionService={this.sectionService}
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

