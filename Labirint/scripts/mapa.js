
/// <reference path="/scripts/babylon.js" />

function Mapa(filePath) {
    this.reader = new XMLHttpRequest() //|| new ActiveXObject('MSXML2.XMLHTTP');
    this.txt = filePath || "./mape/mapa1.txt";
    this.map = [];

    loadFileX = function() {
        this.reader.open('GET', this.txt);
        this.reader.onreadystatechange = displayContents;
        this.reader.send(null);
    }

    this.parseMap = function (data) {
        var lines = data.split("\n");
        for (l in lines) {
            line = lines[l].split("");
            line = line.slice(0, line.length - 1);
            elementi = [];
            for (el in line) {
                gradnik = new Gradnik(parseInt(line[el]), el, l);
                elementi.push(gradnik);
            }
            this.map.push(elementi);
        }
    }

    this.loadFile = function () {
        var request = this.reader;
        var myState = this;
        request.open("GET", this.txt);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log("loadFile");
                myState.parseMap(request.responseText);              
            }}  
        request.send();
    }
    this.loadFile();
}

