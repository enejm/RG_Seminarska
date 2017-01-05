function Game() {
    this.ticks = 0;
    document.addEventListener("DOMContentLoaded", startBabylonJS, false);
    function startBabylonJS() {
        if (BABYLON.Engine.isSupported()) {
            //2D canvas
            menucanvas = document.getElementById('menuCanvas');
            var context = menucanvas.getContext('2d');

            menucanvas.width = window.innerWidth;
            menucanvas.height = window.innerHeight;

            context.beginPath();
            context.rect(0, 0, menucanvas.width, menucanvas.height);
            context.fillStyle = blue;
            context.fillRect(0, 0, menucanvas.width, menucanvas.height);;

            menucanvas.style.display = 'none';


            //Rendering canvas
            canvas = document.getElementById("renderCanvas");
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


            // Skybox
            var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/skybox/skybox", scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skybox.material = skyboxMaterial;

            //Luci
            //light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            //Infromativen izris kocke za pozicioniranje luci - potem izbrisi
            var sonX = 60;
            var sonY = 170;
            var sonZ = -80;
            var soncePos = new BABYLON.Mesh.CreateBox("soncePos", 2, scene);
            soncePos.position = new BABYLON.Vector3(sonX, sonY, sonZ);
            var sonce = new BABYLON.PointLight("sonce", new BABYLON.Vector3(sonX, sonY, sonZ), scene);


            //KEY LISTENERS
            document.addEventListener("keydown", handleKeyDown, false);

            function handleKeyDown(evt) {
                if (evt.keyCode == "67") { //C - noclip (for testing)
                    BABYLON.Tools.Log("C detected");
                    changeCamera();
                }
                if (evt.keyCode == "77") { //M - menu
                    BABYLON.Tools.Log("M detected");
                    swapCanvases();
                }
                if (evt.keyCode == "86") { //V - Debug layer
                    BABYLON.Tools.Log("V detected");
                    toggleDebugLayer();
                }

            }

            function changeCamera() {
                camera.applyGravity = !camera.applyGravity;
                scene.collisionsEnabled = !scene.collisionsEnabled;
                if (camera.speed == 1) {
                    camera.speed = 2
                } else { camera.speed = 1 };
            }

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
                    }
                }

            });

            function getCameraXZ() {
                return [Math.floor(camera.position.x / 3), Math.floor(camera.position.z / 3)];
            }
        }
    }
}