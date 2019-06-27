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

// Books
import Books from '../pages/books/Books';
import CreateBook from '../pages/books/CreateBook';
import EditBook from '../pages/books/EditBook';

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
import BookService from '../services/BookService';
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
        this.bookService = new BookService(this.httpService);
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

                            {/* ============= Books =========== */}
                            <Route path="/books"
                                render={(props) =>
                                    <Books
                                        {...props}
                                        bookService={this.bookService}
                                    />
                                }
                                exact={true} />
                            <Route path="/books/create"
                                render={(props) =>
                                    <CreateBook
                                        {...props}
                                        bookService={this.bookService}
                                        sectionService={this.sectionService}
                                    />
                                }
                                exact={true} />
                            <Route path="/books/:id/edit"
                                render={(props) =>
                                    <EditBook
                                        {...props}
                                        bookService={this.bookService}
                                        sectionService={this.sectionService}
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

