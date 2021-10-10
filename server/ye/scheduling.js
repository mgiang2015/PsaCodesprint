import { Route } from './routing.js'

const workingDuration = 12 * 60;

class Truck {
    constructor(plateNumber) {
        this.routes = []
        this.plateNumber = plateNumber
    }

    add(route) {
        this.routes.push(route)
    }

    getLoad() {
        return this.routes
            .map(r => r.duration)
            .reduce((dur1, dur2) => dur1 + dur2, 0)
    }

    getFreeLoad() {
        return workingDuration - this.getLoad();
    }
}

function scheduleTrucks(routes) {

    let ascDuration = (x, y) => x.duration - y.duration;

    let large = routes.filter(r => r.duration > workingDuration / 2).sort(ascDuration)
    let medium = routes.filter(r => r.duration <= workingDuration / 2 && r.duration > workingDuration / 3).sort(ascDuration)
    let small = routes.filter(r => r.duration <= workingDuration / 3 && r.duration > workingDuration / 6).sort(ascDuration)
    let tiny = routes.filter(r => r.duration <= workingDuration / 6).sort(ascDuration)

    // 1. Allot a bin for each large item, ordered largest to smallest
    let trucks = []
    while (large.length > 0) {
        let t = new Truck();
        t.add(large.pop())
        trucks.push(t)
    }

    // 2. Proceed forward through the bins. On each: If the smallest remaining 
    // medium item does not fit, skip this bin. Otherwise, place the largest remaining 
    // medium item that fits.
    for (var i = 0; i < trucks.length; i++) {
        let t = trucks[i];
        for (var j = 0; j < medium.length; j++) {
            let m = medium[j]
            if (m.duration <= t.getFreeLoad()) {
                t.add(m)
                medium.splice(j, 1);
            }
        }
    }

    // 3. Proceed backward through those bins that do not contain a medium item.
    // On each: If the two smallest remaining small items do not fit, skip this 
    // bin. Otherwise, place the smallest remaining small item and the largest 
    // remaining small item that fits.
    for (var i = trucks.length - 1; i >= 0; i--) {
        let t = trucks[i]
        if (small.length >= 2 && (small[0].duration + small[1].duration > t.getFreeLoad())) {
            continue;
        }
        if (small.length < 1) break;
        if (small[0].duration > t.getFreeLoad()) {
            continue;
        }
        t.add(small.shift())
        for (var j = 0; j < small.length; j++) {
            let s = small[j]
            if (s.duration <= t.getFreeLoad()) {
                t.add(s)
                small.splice(j, 1);
            }
        }
    }

    // 4. Proceed forward through all bins. If the smallest remaining item of any size class does 
    // not fit, skip this bin. Otherwise, place the largest item that fits and stay on this bin.
    let remaining = medium.concat(small).concat(tiny).sort(ascDuration)
    for (var i = 0; i < trucks.length; i++) {
        let t = trucks[i]
        while (remaining.length > 0 && remaining[0].duration <= t.getFreeLoad()) {
            t.add(remaining.shift())
        }
    }

    // 5. Use FFD to pack the remaining items into new bins.
    while (remaining.length > 0) {
        let t = new Truck()
        for (var i = remaining.length - 1; i >= 0; i--) {
            let r = remaining[i]
            if (r.duration <= t.getFreeLoad()) {
                t.add(r)
                remaining.splice(i, 1)
            }
        }
        trucks.push(t)
    }

    return trucks;
}

export { Truck, scheduleTrucks }
