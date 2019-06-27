export default class Room {

    constructor() {
        this.id = -1;
        this.name = '';
        this.meters = '';
    }

    fillFromResponse(res) {
        this.id = res.id;
        this.name = res.name;
        this.meters = res.meters;
    }

}
