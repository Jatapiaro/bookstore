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


}
