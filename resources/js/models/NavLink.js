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
        const route = window.location.href;
        return route.indexOf(this.route) !== -1;
    }

    getIcon() {
        return `${this.icon}`
    }

}
