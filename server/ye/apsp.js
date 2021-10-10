const edgeList = [
    [0, 1, 4],
    [0, 2, 2],
    [1, 3, 2],
    [2, 3, 4],
    [2, 4, 3],
    [3, 4, 3],
    [4, 5, 3],
    [4, 6, 3],
    [5, 6, 6]
]

const numNodes = 7
const depot = 0

let apsp = []
for (var i = 0; i < numNodes; i++) {
    let distances = []
    for (var j = 0; j < numNodes; j++) {
        distances.push(999999);
    }
    apsp.push(distances);
}
// D[i][i] = 0
for (var i = 0; i < numNodes; i++) {
    apsp[i][i] = 0;
}
// D[i][j] = w(i, j)
edgeList.forEach(([u, v, w]) => apsp[u][v] = w)

for (var k = 0; k < numNodes; k++) {
    for (var i = 0; i < numNodes; i++) {
        for (var j = 0; j < numNodes; j++) {
            apsp[i][j] = Math.min(apsp[i][j], apsp[i][k] + apsp[k][j])
            apsp[j][i] = apsp[i][j]
        }
    }
}

export {apsp, depot};
