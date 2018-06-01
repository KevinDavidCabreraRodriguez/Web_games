var document = document,
    console = console,
    mouseX = 50,
    mouseY = 50,
    nAsteroid = 0,
    thrust = 0,
    maxThrust = 100,
    maxWidth = document.getElementById('world').clientWidth,
    maxHeight = document.getElementById('world').clientHeight;

var player = {
    item: document.getElementById("player"),
    x: 500,
    y: 200,
    r: 0,
    img: "resources/imgs/ship.png",
    move: function () {
        this.item.style.left = this.x + "px";
        this.item.style.top = this.y + "px";
    },
    rotate: function () {
        if (this.r > 360)
            this.r = 0;
        this.item.style.transform = "rotate(" + this.r + "deg)";
    }
};

var gunsight = {
    item: document.getElementById("sight"),
    x: document.getElementById("sight").offsetLeft,
    y: document.getElementById("sight").offsetTop,
    img: "resources/imgs/sight.png",
    updatePos: function () {
        this.item.style.left = (mouseX - 8) + "px";
        this.item.style.top = (mouseY - 8) + "px";
    }
};

var asteroid = {
    x: 0,
    y: 0,
    img: "resources/imgs/asteroid.png",
}

function startGame() {
    gunsight.item.setAttribute("src", gunsight.img);
    player.item.setAttribute("src", player.img);
    document.getElementById("button_box").remove();
    document.getElementById("world").style.cursor = "none";
    updateWorld();
}

function detectMouse(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function updateWorld() {
    gunsight.updatePos();
    player.move();
    player.rotate();
    setTimeout(function () {
        updateWorld();
    }, (3 * 5));
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function checkKey(e) {

    e = e || window.event;

    console.log(e.keyCode);

    switch (e.keyCode) {
        case (32):
            if (thrust < maxThrust)
                thrust++;
            break;
        case (68):
            player.r = player.r + 10;
            break;
        case (65):
            player.r = player.r - 10;
            break;
    }
}

document.onkeydown = checkKey;
