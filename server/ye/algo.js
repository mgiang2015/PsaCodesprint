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

function getReceipts(trucks, receiverNum) {
    let receipts = []
    trucks.forEach(t => {
        t.schedule.forEach(sr => {
            let route = sr.route;
            let container = route.container
            let deliveries = container.contents
            deliveries = deliveries.filter(d => receiverNum == d.dest)
            deliveries.forEach(d => {
                receipts.push({
                    delivery: d,
                    receiveTime: sr.deliveryTime,
                    containerCode: container.code,
                    truckNumber: t.plateNumber
                })
            })
        })
    })
    return receipts
}

function getSends(trucks, senderNum) {
    let receipts = []
    trucks.forEach(t => {
        t.schedule.forEach(sr => {
            let route = sr.route;
            let container = route.container
            let deliveries = container.contents
            deliveries = deliveries.filter(d => senderNum == d.origin)
            deliveries.forEach(d => {
                let loadingTime = sr.startTime + route.timeArriveAt(senderNum)
                receipts.push({
                    delivery: d,
                    loadingTime: loadingTime,
                    containerCode: container.code,
                    truckNumber: t.plateNumber
                })
            })
        })
    })
    return receipts
}

export {createTrucks, getReceipts, getSends}
