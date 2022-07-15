class Menu {
    constructor(menu) {
        this.menu = menu;
    }

    addToMenu = (name, item = {}) => {
        if (name && this.menu[name]) {
            this.menu[name].push(item);
        } else if (name) {
            this.menu[name] = [item];
        }
    };

    removeItem = (name, removeItem) => {
        if (name && this.menu[name]) {
            this.menu[name] = this.menu[name].filter(
                menuItem => menuItem.item !== removeItem.item && menuItem.time !== removeItem.time
            );
        }
    };
}

class Cook {
    constructor() {
        this.queue = [];
        this.timer = null;
    }

    createOrder = (order = [], callback = () => {}) => {
        let indexOrder = this.queue.length;
        this.queue.push({ order, callback });
        let callbackNow = callback;
        let orderNow = order;
        let count = 0;

        if (!this.timer) {
            const tik = () => {
                if (count === orderNow.length - 1) {
                    callbackNow(orderNow);
                    delete this.queue[indexOrder];

                    if (this.queue[++indexOrder]) {
                        count = 0;
                        orderNow = this.queue[indexOrder].order;
                        callbackNow = this.queue[indexOrder].callback;
                        this.timer = setTimeout(tik, orderNow[count].time);
                    } else {
                        this.queue = [];
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                } else {
                    count++;
                    this.timer = setTimeout(tik, orderNow[count].time);
                }
            };

            this.timer = setTimeout(tik, orderNow[count].time);
        }
    };
}

const menu = {
    burgerMenu: [
        { item: 'Burger', time: 2000 },
        { item: 'Cola', time: 500 },
        { item: 'Ff', time: 1000 },
    ],
    pizzaMenu: [
        { item: 'Pizza', time: 3000 },
        { item: 'Pepsi', time: 500 },
        { item: 'Souse', time: 500 },
    ],
};

const mainMenu = new Menu(menu);

const cook = new Cook();

function renderComplete(order) {
    console.log(order.map(el => el.item + ' done'));
}

cook.createOrder(menu.burgerMenu, renderComplete);
cook.createOrder(menu.pizzaMenu, renderComplete);
