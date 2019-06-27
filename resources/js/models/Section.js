export default class Section {

    constructor() {
        this.id = -1;
        this.name = "";
        this.room_id = -1;
        this.room = null;
    }

    fillFromResponse(res) {
        this.id = res.id;
        this.name = res.name;
        this.room_id = res.room_id;
        this.room = res.room;
    }

}
