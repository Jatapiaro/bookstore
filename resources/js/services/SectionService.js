export default class SectionService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = '/sections';
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

    store(section) {
        const body = this.getData(section);
        return this.httpService.makePost(this.route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    update(section) {
        const route = `${this.route}/${section.id}`;
        const body = this.getData(section);
        return this.httpService.makePut(route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    delete(section) {
        const route = `${this.route}/${section.id}`;
        return this.httpService.makeDelete(route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getData(section) {
        return {
            section: section
        }
    }

}
