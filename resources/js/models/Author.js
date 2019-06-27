export default class Author {

    constructor() {
        this.id = -1;
        this.name = "";
        this.books = [];
    }

    fillFromResponse(res) {
        this.id = res.id;
        this.name = res.name;
        this.books = res.books;
    }

}
