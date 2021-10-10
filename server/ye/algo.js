import { Delivery, Order, orderToDelivery, containerize } from './teu.js'
import { Route } from './routing.js'
import { scheduleTrucks, Truck } from './scheduling.js'

function createTrucks(orders) {
    let deliveries = orderToDelivery(orders)
    let containers = containerize(deliveries)
    let routes = []
    containers.forEach(c => routes.push(new Route(c)))
    let trucks = scheduleTrucks(routes)
    return trucks;
}

export {createTrucks}
