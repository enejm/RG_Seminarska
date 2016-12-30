/// <reference path="/scripts/babylon.js" />

"use strict";

var canvas;
var engine;
var scene;
var camera;
var mesh;
var light;
var keys;

document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        //Scena
        scene = new BABYLON.Scene(engine);
        scene.debugLayer.show(true, camera);
        scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
        scene.collisionsEnabled = true;

        //Ninja     
        var ninja = new Ninja(1 * 3+1.5, 2 * 3);
        //Kamera
        //camera = new babylon.freecamera("myfirstcam", new babylon.vector3(10, 100, 10), scene);
        
        //camera = new BABYLON.camera("myfirstcam", new babylon.vector3(1 * 3, 2, 1 * 3), scene);
        //camera.attachcontrol(canvas);
        //camera.checkcollisions = true;w
        //camera.applygravity = true;

        camera = new BABYLON.ArcRotateCamera("arcCam", BABYLON.Tools.ToRadians(45), BABYLON.Tools.ToRadians(45), 8, ninja.ninja, scene);
                
        //ninja.ninja.lookAt(camera); //this.ninja.lookAt
        
        
        //engine.isPointerLock = true;


        //camera = new BABYLON.ArcFollowCamera("arcCam", BABYLON.Tools.ToRadians(45), BABYLON.Tools.ToRadians(45), 10, ninja.ninja, scene);

        //camera = new BABYLON.FollowCamera("followCam", BABYLON.Vector3.Zero(), scene);
        //camera.target = ninja.ninja;
        //camera.radius = 10; // how far from the object to follow
        //camera.heightOffset = 4; // how high above the object to place the camera
        //camera.rotationOffset = 180; // the viewing angle
        //camera.cameraAcceleration = 0.05 // how fast to move
        //camera.maxCameraSpeed = 20 // speed limit

        camera.attachControl(canvas, true);
        scene.activeCamera = camera;
        
        //TLA
        //Material za Tla
        var mCount = 62;
        var sirina = 25*3;
        var dolzina = 20*3;
        var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.emissiveTexture = new BABYLON.Texture("textures/trava.jpg", scene);
        groundMaterial.emissiveTexture.uScale = mCount;
        groundMaterial.emissiveTexture.vScale = mCount;
        groundMaterial.bumpTexture = new BABYLON.Texture("textures/trava.jpg", scene);
        groundMaterial.bumpTexture.uScale = mCount;
        groundMaterial.bumpTexture.vScale = mCount;
        groundMaterial.specularTexture = new BABYLON.Texture("textures/trava.jpg", scene);
        groundMaterial.specularTexture.uScale = mCount;
        groundMaterial.specularTexture.vScale = mCount;
                
        var ground = new BABYLON.Mesh.CreateGround("ground", sirina, dolzina, 1, scene);
        ground.position = new BABYLON.Vector3((sirina / 2), 0, (dolzina / 2));
        ground.material = groundMaterial;
        ground.checkCollisions = true;


        // Ground
        //var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        //groundMaterial.emissiveTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_d100.jpg", scene);
        //groundMaterial.emissiveTexture.uScale = mCount;
        //groundMaterial.emissiveTexture.vScale = mCount;
        //groundMaterial.bumpTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_b010.jpg", scene);
        //groundMaterial.bumpTexture.uScale = mCount;
        //groundMaterial.bumpTexture.vScale = mCount;
        //groundMaterial.specularTexture = new BABYLON.Texture("textures/arroway.de_tiles-35_s100-g100-r100.jpg", scene);
        //groundMaterial.specularTexture.uScale = mCount;
        //groundMaterial.specularTexture.vScale = mCount;

        //var ground = BABYLON.Mesh.CreateGround("ground", (mCount + 2) * BLOCK_SIZE,
        //                                                 (mCount + 2) * BLOCK_SIZE,
        //                                                  1, scene, false);
        //
        //ground.checkCollisions = true;

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        console.log("BBBBB");
        BABYLON.Tools.Log("blah22")

        //Mapa
        //var map = new Mapa("./mape/mapa1.txt");
        var map = new Mapa();

        //Luci
        //light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        //Infromativen izris kocke za pozicioniranje luci - potem izbrisi
        var sonX = 60;
        var sonY = 170;
        var sonZ = -80;
        var soncePos = new BABYLON.Mesh.CreateBox("soncePos", 2, scene);
        soncePos.position = new BABYLON.Vector3(sonX, sonY, sonZ);
        var sonce = new BABYLON.PointLight("sonce", new BABYLON.Vector3(sonX, sonY, sonZ), scene);  

        //Kontrole
        keys = { letft: 0, right: 0, forward: 0, back: 0 };
        window.addEventListener("keydown", handleKeyDown, false);
        window.addEventListener("keyup", handleKeyUp, false);
        function handleKeyDown(evt) {
            if (evt.keyCode == 65) {//A        
                keys.left = 1;
            } if (evt.keyCode == 68) {//D
                keys.right = 1;
            } if (evt.keyCode == 87) {//W
                keys.forward = 1;
            } if (evt.keyCode == 83) {//S
                keys.back = 1;
            }
        }
        function handleKeyUp(evt) {
            if (evt.keyCode == 65) {
                keys.left = 0;
            } if (evt.keyCode == 68) {
                keys.right = 0;
            } if (evt.keyCode == 87) {
                keys.forward = 0;
            } if (evt.keyCode == 83) {
                keys.back = 0;
            }
        }

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            engine.clear(new BABYLON.Color3(0.5, 0.5, 0.5), true);
            //scene.getMeshByName("ninja").position.z += 0.01;
            ninja.update();
            
            console.log(camera.alpha);
            scene.render();            
        });
    }
}