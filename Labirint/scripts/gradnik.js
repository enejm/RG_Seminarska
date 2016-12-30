/// <reference path="/scripts/babylon.js" />

function Gradnik(tip, posX, posY) {
    this.tip = tip;
    this.posX = posX;
    this.posY = posY;
    this.ime = posX+"_"+posY;
    this.mat = new BABYLON.StandardMaterial("mat" + this.ime, scene);
    this.sirina = 3;
    if (tip == 1) {
        var g = new BABYLON.Mesh.CreateBox("g" + this.ime, this.sirina, scene);
        g.position = new BABYLON.Vector3(this.sirina / 2 + this.posX * this.sirina, this.sirina/2, this.sirina / 2 + this.posY * this.sirina);
        //g.material = this.mat;
        g.checkCollisions = true;
        //this.mat.diffuseColor = new BABYLON.Color3.Red();
        //this.mat.specularColor = new BABYLON.Color3.Black();

        var cubeTopMaterial = new BABYLON.StandardMaterial("cubeTop", scene);
        cubeTopMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.15);

        var cubeWallMaterial = new BABYLON.StandardMaterial("cubeWalls", scene);
        cubeWallMaterial.emissiveTexture = new BABYLON.Texture("textures/masonry-wall-texture.jpg", scene);
        cubeWallMaterial.bumpTexture = new BABYLON.Texture("textures/masonry-wall-bump-map.jpg", scene);
        cubeWallMaterial.specularTexture = new BABYLON.Texture("textures/masonry-wall-normal-map.jpg", scene);

        var cubeMultiMat = new BABYLON.MultiMaterial("cubeMulti", scene);
        cubeMultiMat.subMaterials.push(cubeTopMaterial);
        cubeMultiMat.subMaterials.push(cubeWallMaterial);

        //var topCube = BABYLON.Mesh.CreatePlane("ground", BLOCK_SIZE, scene, false);
        //topCube.material = cubeTopMaterial;
        //topCube.rotation.x = Math.PI / 2;
        //topCube.setEnabled(false);
        g.material = cubeWallMaterial;
        g.scaling = new BABYLON.Vector3(1, 1.8, 1);


    }
}