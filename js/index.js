import { Home } from "./pages/home.js"
import { NotFound } from "./pages/not_found.js"
import { Bookmarks } from "./pages/bookmarks.js"
import { Movies } from "./pages/movies.js"
import { Tv } from "./pages/tv.js"
import { Search } from "./pages/search.js"

const root = document.querySelector(".allapp")

const routes = [
        {
            match: (url) => url === '/',
            renderRoute: Home,
        },
        {
            match: (url) => url.includes('/bookmarks'),
            renderRoute: Bookmarks,
        },
        {
            match: (url) => url.includes('/search'),
            renderRoute: Search,
        },
        {
            match: (url) => url.includes('/movie'),
            renderRoute: Movies,
        },
        {
            match: (url) => url.includes('/tv'),
            renderRoute: Tv,
        },
        {
            match: () => true,
            renderRoute: NotFound,
        }
    ];

class Router {
    constructor(routes) {
        this._routes = routes;
        this.reroute();
        window.history.pushState = (data, title, url) => {
            History.prototype.pushState.apply(window.history, [data, title, url]);
            this.reroute();
        };
        window.onpopstate = () => {
            this.reroute()
        };

    };
    reroute() {
        const matchedRouts = this._routes.find(route => {
            const matched = route.match(window.location.pathname);
            return matched

        });
        matchedRouts.renderRoute(root);
    };
};

const router = new Router(routes);
