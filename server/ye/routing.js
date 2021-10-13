import { apsp, depot } from './apsp.js'
const loadTime = 30;

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

class Route {
    constructor(container) {
        this.container = container;
        let pickups = []
        container.contents.forEach(d => pickups.push(d.origin))
        this.pickups = Array.from(new Set(pickups)); // Remove duplicates
        this.dest = container.contents[0].dest

        let [dist, path] = shortestPath(depot, this.dest, this.pickups)
        // find time from depot to delivery point
        this.depotToDeliveryTime = dist + (path.length - 1) * loadTime

        // add on the return to depot
        dist += apsp[this.dest][depot]
        path.push(depot)
        this.dist = dist
        this.path = path
        this.duration = dist + path.length * loadTime
    }

    timeArriveAt(nodeNum) {
        let path = this.path
        let time = 0;
        for (var i = 0; i < this.path.length; i++) {
            if (i > 0) time += apsp[path[i - 1]][path[i]]
            if (path[i] == nodeNum) break;
            time += loadTime;
        }
        return time;
    }
}

export { Route }
