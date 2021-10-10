import { Delivery, Order, orderToDelivery, containerize } from './teu.js'
import { Route } from './routing.js'
import { scheduleTrucks, Truck } from './scheduling.js'
import {createTrucks} from './algo.js'

let orders = [
    new Order(3, 1, 15),
    new Order(2, 1, 12),
    new Order(6, 3, 8),
    new Order(5, 3, 2),
    new Order(3, 5, 3),
    // new Order(3, 5, 200),
]

// let deliveries = orderToDelivery(orders)
// let containers = containerize(deliveries)
// let routes = []
// containers.forEach(c => routes.push(new Route(c)))
// let trucks = scheduleTrucks(routes)

let trucks = createTrucks(orders)
let toPrint = trucks
import util from 'util'
console.log(util.inspect(toPrint, { showHidden: false, depth: null, colors: true }))
console.log(trucks.length)
