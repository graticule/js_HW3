class Good {
    constructor(id, name, description, sizes, price, available){
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available){
        this.available = available;
    }
}

class GoodList {
    #goods = []

    constructor(goods, filter, sortPrice=false, sortDir=true) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const result = this.#goods.filter((x) => this.filter.test(x.name))
        if(this.sortPrice){
            return result.sort((x, y) => x.price > y.price ? 
                -Math.pow(-1, this.sortDir) : Math.pow(-1, this.sortDir));
        } 
        return result;
    }

    add(good) {
        this.#goods += [good]
    }

    remove(id) {
        this.#goods = this.#goods.filter((x) => x.id != id)
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods;
    }

    get totalAmount() {
        return this.goods.reduce((total, good) => total + good.amount, 0);
    }

    get totalSum() {
        return this.goods.reduce((total, good) => total + good.price * good.amount, 0);
    }

    add(good, amount) {
        let isAdded = false;
        this.goods.forEach((x) => {
            if (x.id === good.id) {
                x.amount += amount;
                isAdded = true;
            };
        });
        if (!isAdded) {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    remove(good, amount) {
        this.goods.forEach((x) => {
            if(x.id === good.id){
                x.amount -= amount;
            };
        });
        this.goods = this.goods.filter((x)=>x.amount > 0);
    }

    clear() {
        this.goods = []
    }

    removeUnavailable() {
        this.goods = this.goods.filter((x) => x.available);
    }
}



good1 = new Good(1, 'Помидор красный', 'Помидор красный', null, 1, true);
good2 = new Good(2, 'Огурец короткий', 'Огурец короткий', null, 2, true);
good3 = new Good(3, 'Помидор желтый', 'Помидор желтый', null, 3, false);
good4 = new Good(4, 'Огурец длинный', 'Огурец длинный', null, 4, true);
good5 = new Good(5, 'Паста томатная', 'Паста томатная', null, 5, false);
good6 = new Good(6, 'Томат-черри', 'Томат-черри', null, 6, true);
good7 = new Good(7, 'Огурец соленый', 'Огурец соленый', null, 3, true);

const shop1 = new GoodList([good1, good2, good3, good4, good5, good6, good7], /томат/i, true, false)
const shop2 = new GoodList([good1, good2, good3, good4, good5, good6, good7], /ый/, true)
const shop3 = new GoodList([good1, good2, good3, good4, good5, good6, good7], /рец/i)
console.log(shop1.list);
console.log(shop2.list);
console.log(shop3.list);

const basket = new Basket([]);
console.log(basket);
basket.add(good1, 2);
basket.add(good3, 2);
basket.add(good6, 10);
console.log(basket);
console.log(basket.totalAmount);
basket.removeUnavailable();
console.log(basket);
console.log(basket.totalAmount);
console.log(basket.totalSum);