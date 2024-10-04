const numberContainer = document.querySelector('.numbers');
const scoreDisplay = document.querySelector('.pontszam');
const totalNumbers = 9;
let order = generateRandomOrder(totalNumbers);
let pressed = 0;
let started = false;
let score = 0;

function createNumberElements() {
    for (let i = 0; i < totalNumbers; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.textContent = order[i];
        numberDiv.addEventListener("click", handleClick);
        numberContainer.appendChild(numberDiv);
    }

    order.sort((a, b) => a - b);
}

function generateRandomOrder(length) {
    const orderArray = Array.from({ length }, (_, i) => i + 1);
    return orderArray.sort(() => Math.random() - 0.5);
}

function handleClick(e) {
    const target = e.target;

    if (!started) {
        started = true;
        setElementsStyle("#000", "#000");
    }

    if (parseInt(target.textContent) === order[pressed]) {
        updateElementStyle(target, "#fff", "#fff");
        pressed++;

        if (pressed === totalNumbers) {
            score++;
            scoreDisplay.textContent = score;
            resetGame();
        }
    } else {
        flashElements();
    }
}

function setElementsStyle(bgColor, textColor) {
    const numberElements = numberContainer.querySelectorAll('div');
    numberElements.forEach(el => {
        el.style.backgroundColor = bgColor;
        el.style.color = textColor;
    });
}

function updateElementStyle(element, bgColor, textColor) {
    const newElement = element.cloneNode(true);
    newElement.style.cursor = "default";
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;

    element.parentNode.replaceChild(newElement, element);
}

function flashElements() {
    const numberElements = numberContainer.querySelectorAll('div');
    numberElements.forEach(el => {
        el.style.transition = "all .1s";
        el.style.backgroundColor = "red";
        el.innerHTML="&nbsp;";
    });

    setTimeout(() => {
        numberElements.forEach(el => {
            el.style.backgroundColor = "black";
        });
    }, 250);

    setTimeout(() => {
        resetGame(true);
    }, 500)
}

function resetGame(fail = false) {
    started = false;
    pressed = 0;
    order = generateRandomOrder(totalNumbers);

    numberContainer.innerHTML = '';
    createNumberElements();

    if (fail) {
        score = 0;
        scoreDisplay.textContent = score;
    }
}

createNumberElements();
