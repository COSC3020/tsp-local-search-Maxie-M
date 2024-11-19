// code.js
// Maxie Machado
// TSP Local Search 

function tsp_ls(distance_matrix) {
    const n = distance_matrix.length; 

    function calculateRouteLength(route) {
        let len = 0;

        for (let i = 0; i < route.length - 1; i++) {
            length += distance_matrix[route[i]][route[i + 1]];
        }
        return len;
    }

    function twoOptSwap(route, i, k) {
        const newRoute = route.slice(0, i)
            .concat(route.slice(i, k + 1).reverse())
            .concat(route.slice(k + 1));
        return newRoute;
    }

    let currentRoute = Array.from({ length: n }, (_, i) => i);

    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]];
    }

    let currentLength = calculateRouteLength(currentRoute);
    let improved = true;
    let iterationCount = 0;

    const MAX_ITERATIONS = 10000;
    const NO_IMPROVEMENT_LIMIT = 500;

    let noImprovementCounter = 0;

    while (improved && iterationCount < MAX_ITERATIONS) {
        improved = false;

        const i = Math.floor(Math.random() * (n - 1));
        let k = Math.floor(Math.random() * (n - i - 1)) + i + 1;

        const newRoute = twoOptSwap(currentRoute, i, k);
        const newLength = calculateRouteLength(newRoute);

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
            improved = true; 
            noImprovementCounter = 0;
        }
        else {
            noImprovementCounter++;
        }

        iterationCount++

        if (noImprovementCounter >= NO_IMPROVEMENT_LIMIT) {
            break;
        }
    }
    return currentLength;
}
