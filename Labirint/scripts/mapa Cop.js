
class Mapa {
    constructor(filePath) {
        this.reader = new XMLHttpRequest() //|| new ActiveXObject('MSXML2.XMLHTTP');
        this.txt = filePath || "./mape/mapa1.txt";
        this.map = [];  
    }

    this.loadFileX() {
        this.reader.open('GET', this.txt);
        this.reader.onreadystatechange = displayContents;
        this.reader.send(null);
    }

    this.loadFile() {
        var request = new XMLHttpRequest();
        request.open("GET", "./mape/mapa1.txt");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                this.parseMap(request.responseText);
            }}  
        request.send();
    }

    this.displayContents() {
        if (this.reader.readyState == 4) {
            //var el = document.getElementById('main');
            //el.innerHTML = reader.responseText;
            parseMap(reader.responseText);
        }
    }

    this.parseMap(data) {
        var lines = data.split("\n");
        for (l in lines) {
            line = lines[l].split;
            this.map[l].push(line);
        }
    }
}

