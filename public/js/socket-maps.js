// globales 
let markadores = [];
const markadoresHtml = document.getElementById('listadMarkadores')
// Socket
var socket = io();
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('initmarker','',function(resp){
        markadores = resp;
        mostarMarkers();

    })

});
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('saveMarker', (markers) => {
    markadores = markers;
    mostarMarkers();
})
// mapa
var map = L.map('map').setView([5.341840, -72.390147], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onMapClick({latlng}) {
    const {lat,lng} = latlng;
    
    socket.emit('saveMarker',[lat,lng],function(resp){
        markadores = resp;
        mostarMarkers();
    })
    

}

map.on('dblclick', onMapClick);


const mostarMarkers = () =>{

    console.log(markadoresHtml)
    markadoresHtml.innerHTML=''
    markadores.forEach(marker =>{
        const[lat,lng] = marker;
        $(markadoresHtml).append(`
        <div class="marker">
            <p>Latitude:${lat}</p>
            <p>Longitude:${lng}</p>
            <hr>
        </div>
        `);
        L.marker([lat, lng]).addTo(map);
    });

}
