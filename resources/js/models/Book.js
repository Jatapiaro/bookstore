import moment from 'moment';
export default class Book {

    constructor() {
        this.id = -1;
        this.name = "";
        this.number_of_pages = "";
        this.release_date = moment();
        this.section_id = -1;
        this.section = null;
        this.authors = [];
    }

    fillFromResponse(res) {
        this.id = res.id;
        this.name = res.name;
        this.number_of_pages = res.number_of_pages;
        this.release_date = this.serverDate2moment(res.release_date);
        if (res.section != null) {
            this.section_id = res.section_id;
            this.section = res.section;
        }
        this.authors = res.authors;
    }

    /**
     * Creates a moment object given a time in string
     * @param {string} time
     */
    serverDate2moment(time) {
        const format = 'YYYY-MM-DD';
        let result = moment(time, format);
        return result;
    }

}
