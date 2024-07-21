let currentSolution, currentVertex, currentDirection;

document.getElementById('generatorForm').addEventListener('submit', function (e) {
    e.preventDefault();
    generateQuadratic();
    document.getElementById('showSolution').style.display = 'block';
    document.getElementById('solutionDisplay').style.display = 'none';
    document.getElementById('vertexDisplay').style.display = 'none';
});

document.getElementById('showSolution').addEventListener('click', function () {
    document.getElementById('solutionDisplay').style.display = 'block';
    document.getElementById('vertexDisplay').style.display = 'block';
    displaySolutions();
});

function generateQuadratic() {
    const type = document.getElementById('solutionType').value;
    let a, b, c, solutionType;

    switch (type) {

        case 'integerOrIrrational':
            let chosenType = decideSolutionType();
            if (chosenType === 'integer') {
                [a, b, c] = generateIntegerCoefficients(-10, 10);
            } else {
                [a, b, c] = generateCoefficients(1, 10, false);
            }
            break;
        case 'integer':
            [a, b, c] = generateIntegerCoefficients(-10, 10);
            break;
        case 'irrational':
            [a, b, c] = generateCoefficients(1, 10, false);
            break;
        case 'imaginary':
            [a, b, c] = generateImaginaryCoefficients();
            break;
    }

    const result = solveQuadratic(a, b, c);
    currentSolution = result.solutions;
    currentVertex = result.vertex;
    currentDirection = result.direction;
    displayEquation(a, b, c);
}

// Function to decide between integer and irrational solutions
function decideSolutionType() {
    return Math.random() < 0.5 ? 'integer' : 'irrational';
}

function generateIntegerCoefficients(min, max) {
    let root1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let root2 = Math.floor(Math.random() * (max - min + 1)) + min;
    let a = Math.floor(Math.random() * (max - min + 1)) + min;

    while (root1 == 0) {
        root1 = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while (root2 == 0) {
        root2 = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    while (a == 0) {
        a = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let b = - a * (root1 + root2);
    let c = a * root1 * root2;

    return [a, b, c];

}

function generateCoefficients(min, max, integerOnly) {
    let a, b, c;

    do {
        a = Math.floor(Math.random() * (max - min + 1)) + min;
        b = Math.floor(Math.random() * (max - min + 1)) + min;
        c = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (a === 0 || !Number.isInteger(b * b - 4 * a * c) || (b * b - 4 * a * c) < 0);

    return [a, b, c];
}

function generateImaginaryCoefficients() {
    let a = Math.floor(Math.random() * 10) + 1;
    let b;
    let c;
    do {
        b = Math.floor(Math.random() * 20) - 10; // This can be any range but should include negatives
        c = Math.floor(Math.random() * 10) + 1; // c should be positive to help ensure a negative discriminant
    } while ((b * b - 4 * a * c) >= 0); // Loop until we get a negative discriminant
    return [a, b, c];
}

function solveQuadratic(a, b, c) {
    let vertex = { x: -b / (2 * a), y: a * Math.pow(-b / (2 * a), 2) + b * (-b / (2 * a)) + c };
    let direction = a > 0 ? "upward" : "downward";
    let solutions;
    let discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        solutions = `Imaginary: x = ${-b / (2 * a)} ± √(${-discriminant})i / ${2 * a}`;
    } else if (discriminant === 0) {
        solutions = `x = ${-b / (2 * a)}`;
    } else {
        let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solutions = `x = ${root1}, x = ${root2}`;
    }

    return { solutions, vertex, direction };
}

function displayEquation(a, b, c) {
    const display = document.getElementById('equationDisplay');
    display.innerHTML = `Quadratic Equation: ${a}x² + ${b}x + ${c} = 0`;
}

function displaySolutions() {
    document.getElementById('solutionDisplay').innerHTML = `Solutions:<br>${currentSolution}`;
    document.getElementById('vertexDisplay').innerHTML = `Vertex: (${currentVertex.x}, ${currentVertex.y})<br>Opens: ${currentDirection}`;
}
