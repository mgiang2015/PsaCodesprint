import { apsp, depot } from './apsp.js'
const loadTime = 30;

// var asps = asps

// origin, dest must be integers within the graph
// passthrough is a list of integers within the graph
function shortestPath(origin, dest, passthroughs) {
    let minDist = 999999;
    let path = [];
    if (passthroughs.length == 0) {
        return [apsp[origin][dest], [origin, dest]]
    }
    for (var i = 0; i < passthroughs.length; i++) {
        let p = passthroughs[i];
        let subPass = passthroughs.slice();
        subPass.splice(i, 1)
        let [subDist, subPath] = shortestPath(p, dest, subPass)
        let oriToDest = apsp[origin][p] + subDist
        if (oriToDest < minDist) {
            minDist = oriToDest
            path = subPath
            path.unshift(origin)
        }
    }

    return [minDist, path]
}

// console.log(apsp)
// let asdf = shortestPath(0, 6, [1])
// console.log(asdf)

class Route {
    constructor(container) {
        this.container = container;
        let pickups = []
        container.contents.forEach(d => pickups.push(d.origin))
        this.pickups = Array.from(new Set(pickups)); // Remove duplicates
        this.dest = container.contents[0].dest

        let [dist, path] = shortestPath(depot, this.dest, pickups)
        // add on the return to depot
        dist += apsp[this.dest][depot]
        path.push(depot)
        this.dist = dist
        this.path = path
        this.duration = dist + path.length * loadTime
    }
}

// import { Delivery, containerize } from './teu.js'

// Tests
// let deliveries = [
//     new Delivery(2, 1, 10),
//     new Delivery(3, 1, 8),
//     new Delivery(5, 1, 5),
//     new Delivery(3, 1, 10),
//     new Delivery(4, 1, 2),
//     new Delivery(3, 1, 2),
//     new Delivery(4, 1, 3)
// ]

// import util from 'util'
// let containers = containerize(deliveries);
// let route = new Route(containers[3])
// let toPrint = util.inspect(
//     route,
//     { showHidden: false, depth: null, colors: true }
// )
// console.log(toPrint)

// console.log(apsp)
// console.log(shortestPath(0, 1, [3, 4, 5]))
