﻿/// <reference path="/scripts/babylon.js" />

"use strict";

var canvas;
var menucanvas;
var engine;
var scene;
var camera;
var mesh;
var light;
var keys;
var bla = 0;
var startpoint;
var end;
var map;
var menu = true; //TRUE - in menu, FALSE - in game
var menu_number = 0; //0 - Main menu
var debuglayer = false;

//2D Canvas - MENU

var grey = "#9b9b9b";
var white = "#ffffff";

var black = "#000000";
var blue = "#0077ff";
var red = "#ff0000";
var green = "#25b50c";
var yellow = "#fff71e";
var violet = "#961eff";

var main_menu_img = document.getElementById("menu_main");

//2D canvas init
menucanvas = document.getElementById('menuCanvas');
var context = menucanvas.getContext('2d');


//3D canvas init
canvas = document.getElementById("renderCanvas");

menucanvas.width = window.innerWidth;
menucanvas.height = window.innerHeight;

var w_unit = menucanvas.width /10;
var h_unit = menucanvas.height /10;

mainMenu();



function mainMenu() {
    menu = true;
    menu_number = 0;
    canvas.style.display = 'none';
    menucanvas.style.display = 'inline';

    context.beginPath();
    context.rect(0, 0, menucanvas.width, menucanvas.height);
    context.fillStyle = white;
    context.fillRect(0, 0, menucanvas.width, menucanvas.height);
    context.drawImage(main_menu_img, 0, 0, menucanvas.width, menucanvas.height);

    //startBabylonJS();
}



//startBabylonJS();
//document.addEventListener("DOMContentLoaded", startBabylonJS, false);
function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        menucanvas.style.display = 'none';
        canvas.style.display = 'inline';
        menu = false;

        //Rendering canvas
        //canvas.style.display = 'none';
        engine = new BABYLON.Engine(canvas, true);

        //Scena
        scene = new BABYLON.Scene(engine);
        scene.debugLayer.show(true, camera);
        scene.debugLayer.hide();
        scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        scene.collisionsEnabled = true;

        //Kamera (Karakter)
        camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(5, 5, 5), scene);

        camera.attachControl(canvas, true);
        camera.checkCollisions = true;
        camera.applyGravity = true;
        camera.ellipsoid = new BABYLON.Vector3(0.8, 1.5, 0.8);

        camera.attachControl(canvas, true);

        camera.keysUp = [87]; // W
        camera.keysDown = [83]; // S
        camera.keysLeft = [65]; // A
        camera.keysRight = [68]; // D
        camera.speed = 1;
        camera.inertia = 0.8;
        camera.angularSensibility = 1000;
        scene.activeCamera = camera;

        //Mapa
        //var map = new Mapa("./mape/mapa1.txt");
        map = new Mapa();



        //RENDER-LOOP
        // Once the scene is loaded, just register a render loop to render it
        var wait = 200;
        engine.runRenderLoop(function () {
            //Počaka (wait) frame-ov, da se vse stvari inicializirajo

            engine.clear(new BABYLON.Color3(0.5, 0.5, 0.5), true);
            scene.render();

            if (wait > 0) { wait--; }
            else {
                //END block se vrti
                map.end.mesh.rotation.y += 0.1;
                //Ce je igralec na koncu
                var player_co = getCameraXZ();
                if (player_co[0] == map.end.posX && player_co[1] == map.end.posY) {
                    BABYLON.Tools.Log("KONEC");
                    mainMenu();
                }
            }

        });

        //Helper function - returns the [x,z] of tile player (camera) is in;
        //Used in render loop
        function getCameraXZ() {
            return [Math.floor(camera.position.x / 3), Math.floor(camera.position.z / 3)];
        }
    }
}

//MOUSE LISTENER
document.addEventListener("click", function (evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    BABYLON.Tools.Log("Click: " + x + " " + y);;
    if (menu) {
        if (menu_number == 0) { //main menu
            if (x > 0 && x < 4 * w_unit) { //Possible main bar
                if (y > 7 * h_unit && y < 8 * h_unit) { //PLAY BUTTON
                    BABYLON.Tools.Log("play");
                    startBabylonJS();
                }
            }
        }
    }
});


//KEY LISTENERS
document.addEventListener("keydown", handleKeyDown, false);

function handleKeyDown(evt) {
    //Only if game is running
    if (!menu){
        if (evt.keyCode == "67") { //C - noclip (for testing)
            BABYLON.Tools.Log("C detected");
            changeCamera();
        }
    } else { //Only if in menu
        BABYLON.Tools.Log("C detected x");
    }

    //Always
    if (evt.keyCode == "77") { //M - Toggle: menu/game
        BABYLON.Tools.Log("M detected");
        swapCanvases();
    }
    if (evt.keyCode == "86") { //V - Debug layer
        BABYLON.Tools.Log("V detected");
        //toggleDebugLayer();
        startBabylonJS();
    }

}

//NO CLIP MODE
function changeCamera() {
    camera.applyGravity = !camera.applyGravity;
    scene.collisionsEnabled = !scene.collisionsEnabled;
    if (camera.speed == 1) {
        camera.speed = 2
    } else { camera.speed = 1 };
}

//SWTICH TO MENU
function swapCanvases() {
    if (canvas.style.display == 'none') {
        canvas.style.display = 'inline';
        menucanvas.style.display = 'none';
        menu = false;
    } else {
        canvas.style.display = 'none';
        menucanvas.style.display = 'inline';
        menu = true;
        //context.beginPath();
        //context.rect(0, 0, menucanvas.width, menucanvas.height);
        //context.fillStyle = blue;
        //context.fill;
    }
}

//TOGGLEDEBUGLAYER - not working
function toggleDebugLayer() {
    if (debuglayer) {
        scene.debugLayer.hide();
    } else {
        scene.debugLayer.show();
    }
    debuglayer = !debuglayer;
}
