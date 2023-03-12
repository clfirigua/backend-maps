

class Marker {
    constructor(){
        this.marker = [];
    }


    agregarMarkador(marker){
        this.marker.push(marker);
    }

    getMarker(){
        return this.marker
    }
}

module.exports = {
    Marker
}