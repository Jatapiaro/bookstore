export default class AuthorService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = '/authors';
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

    store(author) {
        const body = this.getData(author);
        return this.httpService.makePost(this.route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    update(author) {
        const route = `${this.route}/${author.id}`;
        const body = this.getData(author);
        return this.httpService.makePut(route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    delete(author) {
        const route = `${this.route}/${author.id}`;
        return this.httpService.makeDelete(route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getData(author) {
        return {
            author: author
        }
    }

}
