import { Delivery, Order, orderToDelivery, containerize, sortDeliveries } from './teu.js'
import { Route } from './routing.js'
import { scheduleTrucks, Truck } from './scheduling.js'

function createTrucks(orders) {
    let deliveries = orderToDelivery(orders)
    let deliMap = sortDeliveries(deliveries)
    let containers = []
    deliMap.forEach(delis => containers = containers.concat(containerize(delis)))
    let routes = []
    containers.forEach(c => routes.push(new Route(c)))
    let trucks = scheduleTrucks(routes)
    return trucks;
}

export {createTrucks}
