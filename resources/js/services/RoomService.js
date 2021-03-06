export default class RoomService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = '/rooms';
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

    store(room) {
        const body = this.getData(room);
        return this.httpService.makePost(this.route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    update(room) {
        const route = `${this.route}/${room.id}`;
        const body = this.getData(room);
        return this.httpService.makePut(route, body)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    delete(room) {
        const route = `${this.route}/${room.id}`;
        return this.httpService.makeDelete(route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getData(room) {
        return {
            room: room
        }
    }

}
