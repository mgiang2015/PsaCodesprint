class Delivery {
    constructor (origin, dest, pallets, code) {
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
    constructor (code) {
        this.contents = [],
        this.code = code
    }

    addDelivery (delivery) {
        this.contents.push(delivery)
    }

    getLoad () {
        return this.contents
            .map((d) => d.pallets)
            .reduce((p1, p2) => p1 + p2)
    }

    getFreeLoad () {
        return 10 - this.getLoad();
    }
}

// Must guarantee that no item > binSize
function mffd(items, binSize) {
    let large = items.filter(i => i > binSize / 2).sort((x ,y) => x - y)
    let medium = items.filter(i => i <= binSize / 2 && i > binSize / 3).sort((x ,y) => x - y)
    let small = items.filter(i => i <= binSize / 3 && i > binSize / 6).sort((x ,y) => x - y)
    let tiny = items.filter(i => i <= binSize / 6).sort((x ,y) => x - y)

    // 1. Allot a bin for each large item, ordered largest to smallest
    let bins = []
    while (large.length > 0) {
        bins.push([large.pop()])
    }

    // 2. Proceed forward through the bins. On each: If the smallest remaining 
    // medium item does not fit, skip this bin. Otherwise, place the largest remaining 
    // medium item that fits.
    for (var i = 0; i < bins.length; i++) {
        let b = bins[i];
        let binFilled = b.reduce((x , y) => x + y)
        for (var j = 0; j < medium.length; j++) {
            let m = medium[j]
            if (binSize - binFilled >= m) {
                b.push(m)
                medium.splice(j, 1);
            }
        }
    }

    // 3. Proceed backward through those bins that do not contain a medium item.
    // On each: If the two smallest remaining small items do not fit, skip this 
    // bin. Otherwise, place the smallest remaining small item and the largest 
    // remaining small item that fits.
    for (var i = bins.length - 1; i >= 0; i--) {
        let b = bins[i]
        let binFilled = b.reduce((x , y) => x + y)
        if (small.length >= 2 && (small[0] + small[1] > binSize - binFilled)) {
            continue;
        }
        if (small.length < 1) break;
        if (small[0] > binSize - binFilled) {
            continue;
        }
        b.push(small.shift())
        binFilled = b.reduce((x , y) => x + y)
        for (var j = 0; j < small.length; j++) {
            let s = small[j]
            if (binSize - binFilled >= s) {
                b.push(s)
                small.splice(j, 1);
            }
        }
    }

    // 4. Proceed forward through all bins. If the smallest remaining item of any size class does 
    // not fit, skip this bin. Otherwise, place the largest item that fits and stay on this bin.
    let remaining = medium.concat(small).concat(tiny).sort((x ,y) => x - y)
    for (var i = 0; i < bins.length; i++) {
        let b = bins[i]
        let binFilled = b.reduce((x , y) => x + y)
        while (remaining.length > 0 && remaining[0] <= binSize - binFilled) {
            b.push(remaining.shift())
            binFilled = b.reduce((x , y) => x + y)
        }
    }

    // 5. Use FFD to pack the remaining items into new bins.
    while (remaining.length > 0) {
        let b = []
        let binFilled = b.reduce((x , y) => x + y, 0)
        for (var i = remaining.length - 1; i >= 0; i--) {
            let r = remaining[i]
            if (r <= binSize - binFilled) {
                b.push(r)
                remaining.splice(i, 1)
                binFilled = b.reduce((x , y) => x + y, 0)
            }
        }
        bins.push(b)
    }

    return bins;
}

console.log(mffd([6,6,7,8,8,9,10, 4, 5, 3, 3, 3, 2, 1, 1, 1], 10))

// let deliveries = [
//     new Delivery('a', 'b', 10, '1b241'),
//     new Delivery('a', 'c', 3, '82wf2'),
//     new Delivery('b', 'c', 4, '5baa2')
// ]
// let c = new Container('AEBFQ');
// c.addDelivery(deliveries[1])
// c.addDelivery(deliveries[2])
// console.log(c.contents)
// console.log(c.getFreeLoad())

// Must guarantee that no item > binSize
function containerize(items, binSize) {
    let large = items.filter(i => i > binSize / 2).sort((x ,y) => x - y)
    let medium = items.filter(i => i <= binSize / 2 && i > binSize / 3).sort((x ,y) => x - y)
    let small = items.filter(i => i <= binSize / 3 && i > binSize / 6).sort((x ,y) => x - y)
    let tiny = items.filter(i => i <= binSize / 6).sort((x ,y) => x - y)

    // 1. Allot a bin for each large item, ordered largest to smallest
    let bins = []
    while (large.length > 0) {
        bins.push([large.pop()])
    }

    // 2. Proceed forward through the bins. On each: If the smallest remaining 
    // medium item does not fit, skip this bin. Otherwise, place the largest remaining 
    // medium item that fits.
    for (var i = 0; i < bins.length; i++) {
        let b = bins[i];
        let binFilled = b.reduce((x , y) => x + y)
        for (var j = 0; j < medium.length; j++) {
            let m = medium[j]
            if (binSize - binFilled >= m) {
                b.push(m)
                medium.splice(j, 1);
            }
        }
    }

    // 3. Proceed backward through those bins that do not contain a medium item.
    // On each: If the two smallest remaining small items do not fit, skip this 
    // bin. Otherwise, place the smallest remaining small item and the largest 
    // remaining small item that fits.
    for (var i = bins.length - 1; i >= 0; i--) {
        let b = bins[i]
        let binFilled = b.reduce((x , y) => x + y)
        if (small.length >= 2 && (small[0] + small[1] > binSize - binFilled)) {
            continue;
        }
        if (small.length < 1) break;
        if (small[0] > binSize - binFilled) {
            continue;
        }
        b.push(small.shift())
        binFilled = b.reduce((x , y) => x + y)
        for (var j = 0; j < small.length; j++) {
            let s = small[j]
            if (binSize - binFilled >= s) {
                b.push(s)
                small.splice(j, 1);
            }
        }
    }

    // 4. Proceed forward through all bins. If the smallest remaining item of any size class does 
    // not fit, skip this bin. Otherwise, place the largest item that fits and stay on this bin.
    let remaining = medium.concat(small).concat(tiny).sort((x ,y) => x - y)
    for (var i = 0; i < bins.length; i++) {
        let b = bins[i]
        let binFilled = b.reduce((x , y) => x + y)
        while (remaining.length > 0 && remaining[0] <= binSize - binFilled) {
            b.push(remaining.shift())
            binFilled = b.reduce((x , y) => x + y)
        }
    }

    // 5. Use FFD to pack the remaining items into new bins.
    while (remaining.length > 0) {
        let b = []
        let binFilled = b.reduce((x , y) => x + y, 0)
        for (var i = remaining.length - 1; i >= 0; i--) {
            let r = remaining[i]
            if (r <= binSize - binFilled) {
                b.push(r)
                remaining.splice(i, 1)
                binFilled = b.reduce((x , y) => x + y, 0)
            }
        }
        bins.push(b)
    }

    return bins;
}
