import { Delivery, Order, orderToDelivery, containerize } from './teu.js'
import { Route } from './routing.js'
import { scheduleTrucks, Truck } from './scheduling.js'
import * as algo from './algo.js'

let orders = [
    new Order(3, 1, 15, 'sdf'),
    new Order(2, 1, 12, 'bfa'),
    new Order(6, 3, 8, 'from six'),
    new Order(5, 3, 2, 'from five'),
    new Order(3, 5, 3),
    // new Order(3, 5, 200),
]

// let deliveries = orderToDelivery(orders)
// let containers = containerize(deliveries)
// let routes = []
// containers.forEach(c => routes.push(new Route(c)))
// let trucks = scheduleTrucks(routes)

let trucks = algo.createTrucks(orders)
let toPrint = trucks
import util from 'util'
console.log(util.inspect(toPrint, { showHidden: false, depth: null, colors: true }))
// console.log(trucks.length)

console.log(algo.getReceipts(trucks, 3))
console.log(algo.getAllStops(trucks))
