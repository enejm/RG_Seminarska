/// <reference path="/scripts/babylon.js" />

function Ninja(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.mat = new BABYLON.StandardMaterial("mat" + this.ime, scene);
    this.sirina = 2;
    this.ninja = new BABYLON.Mesh.CreateBox("ninja", this.sirina, scene);
    this.ninja.position = new BABYLON.Vector3(posX, 1, posY);
    this.ninja.checkCollisions = true;

    //this.dir = new BABYLON.AbstractMesh("dir", scene);
    //this.dir.position = new BABYLON.Vector3.Zero();
    //this.ninja.lookAt(this.dir.position);

    this.update = function () {
        var mv = 0.1;
        this.ninja.rotation.y = -camera.alpha;
        if (keys.left == 1) {
            //move left
            //  this.ninja.moveWithCollisions();
            //this.ninja.position.x -= mv * Math.sin(this.ninja.rotation.y);
            //this.ninja.position.z -= mv * Math.cos(this.ninja.rotation.y);
            left = new BABYLON.Vector3(-mv * Math.sin(this.ninja.rotation.y), 0, -mv * Math.cos(this.ninja.rotation.y));
            this.ninja.moveWithCollisions(left);
        } if (keys.right == 1) {
            //move right
            //this.ninja.position.x += mv * Math.sin(this.ninja.rotation.y);
            //this.ninja.position.z += mv * Math.cos(this.ninja.rotation.y);
            right = new BABYLON.Vector3(mv * Math.sin(this.ninja.rotation.y), 0, mv * Math.cos(this.ninja.rotation.y));
            this.ninja.moveWithCollisions(right);
        } if (keys.back == 1) {
            //move back 
            //this.ninja.position.z -= mv * Math.sin(this.ninja.rotation.y);
            //this.ninja.position.x += mv * Math.cos(this.ninja.rotation.y);
            backward = new BABYLON.Vector3(mv * Math.cos(this.ninja.rotation.y), 0, -mv * Math.sin(this.ninja.rotation.y));
            this.ninja.moveWithCollisions(backward);
        } if (keys.forward == 1) {
            //move forward 
            //posZ = this.ninja.position.z + mv * Math.sin(this.ninja.rotation.y);
            //posX = this.ninja.position.x - mv * Math.cos(this.ninja.rotation.y);
            forward = new BABYLON.Vector3(-mv * Math.cos(this.ninja.rotation.y), 0, mv * Math.sin(this.ninja.rotation.y));
            this.ninja.moveWithCollisions(forward);
        }
    }
    

}