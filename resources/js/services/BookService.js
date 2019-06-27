export default class BookService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = '/books';
    }

    index() {
        return this.httpService.makeGet(this.route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    show(id) {
        const route = `${this.route}/${id}`;
        return this.httpService.makeGet(route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    store(book) {
        const body = this.getData(book);
        return this.httpService.makePost(this.route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    update(book) {
        const route = `${this.route}/${book.id}`;
        const body = this.getData(book);
        return this.httpService.makePut(route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    delete(book) {
        const route = `${this.route}/${book.id}`;
        return this.httpService.makeDelete(route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getData(book) {
        return {
            book: book
        }
    }

}
