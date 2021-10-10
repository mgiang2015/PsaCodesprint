class Delivery {
    constructor(origin, dest, pallets, code) {
        this.origin = origin;
        this.dest = dest;
        this.pallets = pallets;
        this.code = code;
    }
}

function sortDeliveries(deliveries) {
    let commonDestMap = new Map();

    while (deliveries.length > 0) {
        let d = deliveries.pop();
        if (!commonDestMap.has(d.dest)) {
            commonDestMap.set(d.dest, []);
        }
        commonDestMap.get(d.dest).push(d)
    }

    commonDestMap.forEach((a) => a.sort((d1, d2) => d1.pallets - d2.pallets));
    return commonDestMap;
}

class Container {
    constructor(code) {
        this.contents = [],
            this.code = code
    }

    add(delivery) {
        this.contents.push(delivery)
    }

    getLoad() {
        return this.contents
            .map((d) => d.pallets)
            .reduce((p1, p2) => p1 + p2, 0)
    }

    getFreeLoad() {
        return 10 - this.getLoad();
    }
}

// Assumes all deliveries are going to the same operator and packs them efficiently
// into containers using MFFD. Returns list of containers
// Must guarantee that no item > binSize
function containerize(deliveries) {
    const containerSize = 10;

    let ascPallet = (x, y) => x.pallets - y.pallets;

    let large = deliveries.filter(d => d.pallets > containerSize / 2).sort(ascPallet)
    let medium = deliveries.filter(d => d.pallets <= containerSize / 2 && d.pallets > containerSize / 3).sort(ascPallet)
    let small = deliveries.filter(d => d.pallets <= containerSize / 3 && d.pallets > containerSize / 6).sort(ascPallet)
    let tiny = deliveries.filter(d => d.pallets <= containerSize / 6).sort(ascPallet)

    // 1. Allot a bin for each large item, ordered largest to smallest
    let containers = []
    while (large.length > 0) {
        let c = new Container();
        c.add(large.pop())
        containers.push(c)
    }

    // 2. Proceed forward through the bins. On each: If the smallest remaining 
    // medium item does not fit, skip this bin. Otherwise, place the largest remaining 
    // medium item that fits.
    for (var i = 0; i < containers.length; i++) {
        let c = containers[i];
        for (var j = 0; j < medium.length; j++) {
            let m = medium[j]
            if (m.pallets <= c.getFreeLoad()) {
                c.add(m)
                medium.splice(j, 1);
            }
        }
    }

    // 3. Proceed backward through those bins that do not contain a medium item.
    // On each: If the two smallest remaining small items do not fit, skip this 
    // bin. Otherwise, place the smallest remaining small item and the largest 
    // remaining small item that fits.
    for (var i = containers.length - 1; i >= 0; i--) {
        let c = containers[i]
        if (small.length >= 2 && (small[0].pallets + small[1].pallets > c.getFreeLoad())) {
            continue;
        }
        if (small.length < 1) break;
        if (small[0].pallets > c.getFreeLoad()) {
            continue;
        }
        c.add(small.shift())
        for (var j = 0; j < small.length; j++) {
            let s = small[j]
            if (s.pallets <= c.getFreeLoad()) {
                c.add(s)
                small.splice(j, 1);
            }
        }
    }

    // 4. Proceed forward through all bins. If the smallest remaining item of any size class does 
    // not fit, skip this bin. Otherwise, place the largest item that fits and stay on this bin.
    let remaining = medium.concat(small).concat(tiny).sort(ascPallet)
    for (var i = 0; i < containers.length; i++) {
        let c = containers[i]
        while (remaining.length > 0 && remaining[0].pallets <= c.getFreeLoad()) {
            c.add(remaining.shift())
        }
    }

    // 5. Use FFD to pack the remaining items into new bins.
    while (remaining.length > 0) {
        let c = new Container()
        for (var i = remaining.length - 1; i >= 0; i--) {
            let r = remaining[i]
            if (r.pallets <= c.getFreeLoad()) {
                c.add(r)
                remaining.splice(i, 1)
            }
        }
        containers.push(c)
    }

    return containers;
}

class Order {
    constructor(origin, dest, pallets, code) {
        this.origin = origin;
        this.dest = dest;
        this.pallets = pallets;
        this.code = code;
    }
}

function orderToDelivery(orders) {
    let deliveries = []
    while (orders.length > 0) {
        let o = orders.shift()
        while (o.pallets > 10) {
            deliveries.push(new Delivery(o.origin, o.dest, 10))
            o.pallets -= 10
        }
        deliveries.push(o)
    }
    return deliveries
}

let orders = [
    new Order('a', 'b', 15),
    new Order('a', 'b', 12),
    new Order('a', 'b', 8),
    new Order('a', 'b', 2),
    new Order('a', 'b', 3),
]

// Tests
let deliveries = [
    new Delivery('a', 'b', 10),
    new Delivery('a', 'b', 8),
    new Delivery('a', 'b', 5),
    new Delivery('a', 'b', 10),
    new Delivery('a', 'b', 2),
    new Delivery('a', 'b', 2),
    new Delivery('a', 'b', 3)
]

// deliveries = orderToDelivery(orders)

// import util from 'util'
// let containers = containerize(deliveries);
// console.log(util.inspect(containers, {showHidden: false, depth: null, colors: true}))

export {Delivery, containerize, deliveries}
