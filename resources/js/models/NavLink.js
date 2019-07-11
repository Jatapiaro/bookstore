export default class NavLink {

    constructor(name, icon, route, isHome = false) {
        this.name = name;
        this.icon = icon;
        this.route = route;
        this.isHome = isHome;
    }

    isActive() {
        if (this.isHome) {
            const aux = `${window.baseUrl}/`;
            return window.location.href == aux;
        }
        if (this.route === '/books' && window.location.href.indexOf('bookstore') !== -1) {
            return window.location.href.endsWith(this.route);
        }
        const route = window.location.href;
        return route.indexOf(this.route) !== -1;
    }

    getIcon() {
        return `${this.icon}`
    }

}
