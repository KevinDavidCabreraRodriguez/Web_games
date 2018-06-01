var document = document,
    console = console,
    screen = screen,
    window = window,
    setTimeout = setTimeout;
document.getElementById("world").style.backgroundColor = "blue";

var pj = document.getElementById("pj"),
    points_box = document.getElementById("points_box"),
    vel = 20,
    cellsize = 20,
    posx = pj.offsetLeft,
    posy = pj.offsetTop,
    to_where = "right",
    init_snake_length = 3,
    snake_length = init_snake_length,
    last_segment = "",
    buffer_x = [snake_length],
    buffer_y = [snake_length],
    buffer_fruit_x = [],
    buffer_fruit_y = [],
    points = 0,
    total_fruits = 3,
    game_over = false,
    maxWidth = document.getElementById('world').clientWidth,
    maxHeight = document.getElementById('world').clientHeight,
    maxCellsWidth = (maxWidth / cellsize),
    maxCellsHeight = (maxHeight / cellsize),
    skin_selected = 0,
    skin_color = ["green", "red", "pink", "yellow", "white", "black"];

function change_skin() {
    if (skin_selected == (skin_color.length - 1))
        skin_selected = 0;
    else
        skin_selected = skin_selected + 1;
    pj.style.backgroundColor = skin_color[skin_selected];
    if (skin_color[skin_selected] == "black") {
        document.getElementById("eye1").style.backgroundColor = "white";
        document.getElementById("eye2").style.backgroundColor = "white";
    } else {
        document.getElementById("eye1").style.backgroundColor = "black";
        document.getElementById("eye2").style.backgroundColor = "black";
    }
}

var i_fruits = 0;
for (i_fruits = 1; i_fruits <= total_fruits; i_fruits++)
    generate_fruits(i_fruits);

/* init de los segmentos iniciales */
function initpj() {
    var i = 0;
    for (i = 1; i <= snake_length; i++) {
        var new_segment_div = document.createElement('div');
        document.getElementById('world').appendChild(new_segment_div);
        new_segment_div.classList.add('segment');
        new_segment_div.id = "pj" + i;
        new_segment_div.style.display = ("block");
        new_segment_div.style.top = posy + "px";
        new_segment_div.style.left = posx + "px";
        new_segment_div.style.backgroundColor = skin_color[skin_selected];
    }
}

function remove_button_box() {
    document.getElementById("button_box").style.display = ("none");
    startGame();
}

/* colision propia con el jugador */
function detect_own_collision() {
    var i;
    for (i = 1; i <= snake_length; i++) {
        if (posx == buffer_x[i] && posy == buffer_y[i])
            game_over = true;
    }
}

function get_last_segment() {
    last_segment = document.getElementById("pj" + snake_length);
}

/*generar fruta, cada vez que se come una */
function generate_fruits(i) {
    var seedx = 0,
        seedy = 0;
    while (seedx < 20)
        seedx = (Math.trunc(Math.random() * maxCellsWidth)) * 20;
    if (seedx > (maxWidth - cellsize))
        seedx = seedx - cellsize;
    while (seedy < 20)
        seedy = (Math.trunc(Math.random() * maxCellsHeight)) * 20;
    if (seedy > (maxHeight - cellsize))
        seedy = seedy - cellsize;

    var new_fruit_div = document.createElement('div');
    document.getElementById('world').appendChild(new_fruit_div);
    new_fruit_div.classList.add('fruit');
    new_fruit_div.style.left = (seedx + "px");
    new_fruit_div.style.top = (seedy + "px");
    buffer_fruit_x[i] = seedx;
    buffer_fruit_y[i] = seedy;
    new_fruit_div.id = (seedx + "+" + seedy);
}

/* detectar colision con frutas */
function detect_fruit_collision() {
    for (var i = 1; i <= snake_length; i++) {
        if (posx == buffer_fruit_x[i] && posy == buffer_fruit_y[i]) {
            console.log("power up");
            points = points + 10;
            document.getElementById(posx + "+" + posy).remove();
            generate_fruits(i);
            addSegment();
        }
    }
}

function addSegment() {
    var new_segment_div = document.createElement('div');
    document.getElementById('world').appendChild(new_segment_div);
    new_segment_div.classList.add('segment');
    new_segment_div.id = "pj" + (snake_length + 1);
    new_segment_div.style.left = last_segment.offsetLeft + "px";
    new_segment_div.style.top = last_segment.offsetTop + "px";
    new_segment_div.style.display = ("block");
    snake_length++;
    for (var i = 1; i <= snake_length; i++){
        document.getElementById("pj" + i).style.backgroundColor = skin_color[skin_selected];
    }
}

function detect_bound_collision(){
    if (posx < 0 || posy < 0 || posx > maxWidth - 20 || posy > maxHeight - 20)
        game_over = true;
}

function follow(oldx, oldy) {
    buffer_x = [snake_length], buffer_y = [snake_length];
    for (var i = 1; i <= snake_length; i++) {
        buffer_x[i] = document.getElementById("pj" + i).offsetLeft;
        buffer_y[i] = document.getElementById("pj" + i).offsetTop;
    }
    document.getElementById("pj1").style.left = (oldx + "px");
    document.getElementById("pj1").style.top = (oldy + "px");
    for (var y = 2; y <= snake_length; y++) {
        document.getElementById("pj" + y).style.left = (buffer_x[y - 1] + "px");
        document.getElementById("pj" + y).style.top = (buffer_y[y - 1] + "px");
    }
}

function round_borders() {
    switch (to_where) {
        case "right":
            pj.style.borderTopLeftRadius = ("0px");
            pj.style.borderBottomLeftRadius = ("0px");
            pj.style.borderTopRightRadius = ("8px");
            pj.style.borderBottomRightRadius = ("8px");
            break;
        case "left":
            pj.style.borderTopRightRadius = ("0px");
            pj.style.borderBottomRightRadius = ("0px");
            pj.style.borderTopLeftRadius = ("8px");
            pj.style.borderBottomLeftRadius = ("8px");
            break;
        case "up":
            pj.style.borderBottomRightRadius = ("0px");
            pj.style.borderBottomLeftRadius = ("0px");
            pj.style.borderTopLeftRadius = ("8px");
            pj.style.borderTopRightRadius = ("8px");
            break;
        case "down":
            pj.style.borderTopLeftRadius = ("0px");
            pj.style.borderTopRightRadius = ("0px");
            pj.style.borderBottomRightRadius = ("8px");
            pj.style.borderBottomLeftRadius = ("8px");
            break;
    }

    var before_last_segment = document.getElementById("pj" + (snake_length - 1));

    if (last_segment.offsetLeft < before_last_segment.offsetLeft) {
        last_segment.style.borderBottomLeftRadius = ("8px");
        last_segment.style.borderTopLeftRadius = ("8px");
        last_segment.style.borderTopRightRadius = ("0px");
        last_segment.style.borderBottomRightRadius = ("0px");

    }

    if (last_segment.offsetLeft > before_last_segment.offsetLeft) {
        last_segment.style.borderBottomLeftRadius = ("0px");
        last_segment.style.borderTopLeftRadius = ("0px");
        last_segment.style.borderTopRightRadius = ("8px");
        last_segment.style.borderBottomRightRadius = ("8px");
    }

    if (last_segment.offsetTop < before_last_segment.offsetTop) {
        last_segment.style.borderBottomLeftRadius = ("0px");
        last_segment.style.borderTopLeftRadius = ("8px");
        last_segment.style.borderTopRightRadius = ("8px");
        last_segment.style.borderBottomRightRadius = ("0px");
    }

    if (last_segment.offsetTop > before_last_segment.offsetTop) {
        last_segment.style.borderBottomLeftRadius = ("8px");
        last_segment.style.borderTopLeftRadius = ("0px");
        last_segment.style.borderTopRightRadius = ("0px");
        last_segment.style.borderBottomRightRadius = ("8px");
    }
    
    for (var i = 0; i <= snake_length; i++){
        document.getElementById("pj" + 1).style.borderRadius = ("0px");
    }
    before_last_segment.style.borderBottomLeftRadius = ("0px");
    before_last_segment.style.borderTopLeftRadius = ("0px");
    before_last_segment.style.borderTopRightRadius = ("0px");
    before_last_segment.style.borderBottomRightRadius = ("0px");
}

//recursividad
function update_world() {
    var pj_oldx = pj.offsetLeft,
        pj_oldy = pj.offsetTop;
    switch (to_where) {
        case "right":
            posx = posx + vel;
            pj.style.left = posx + "px";
            break;
        case "left":
            posx = posx - vel;
            pj.style.left = posx + "px";
            break;
        case "up":
            posy = posy - vel;
            pj.style.top = posy + "px";
            break;
        case "down":
            posy = posy + vel;
            pj.style.top = posy + "px";
    }
    follow(pj_oldx, pj_oldy);
    get_last_segment();
    detect_own_collision();
    detect_fruit_collision();
    detect_bound_collision();
    round_borders();
    points_box.innerHTML = (points);
    if (game_over == false)
        setTimeout(function () {
            update_world();
        }, (3 * 50));
    else
        document.getElementById("restart_box").style.display = "flex";
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        if (to_where != "down")
            to_where = "up";
    } else if (e.keyCode == '40') {
        if (to_where != "up")
            to_where = "down";
    } else if (e.keyCode == '39') {
        if (to_where != "left")
            to_where = "right";
    } else if (e.keyCode == '37') {
        if (to_where != "right")
            to_where = "left";
    }
}

function startGame() {
    //pj.style.top = Math.trunc((maxCellsHeight * cellsize) / 2);
    //pj.style.left = Math.trunc((maxCellsWidth * cellsize) / 2);
    initpj();
    update_world();
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

document.onkeydown = checkKey;