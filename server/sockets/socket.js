const { io } = require('../server');
const {Marker} = require('../models/markers')
const marker =  new Marker()
io.on('connection', (client) => {
   console.log('backend escuchando');

   client.on('initmarker',(_, callback)=>{
      const markadores = marker.getMarker();
      callback(markadores)
   });

   client.on('saveMarker',(markeriot,callback)=>{
      marker.agregarMarkador(markeriot);
      const markadores = marker.getMarker();
      callback(markadores)

      client.broadcast.emit('saveMarker', markadores );
   })


});