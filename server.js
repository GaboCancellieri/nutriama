var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nutriama', { useNewUrlParser: true, useUnifiedTopology: true }); 

//model loading
Paciente = require('./api/pacientes/pacientes.schema');
Seguimiento = require('./api/seguimiento/seguimiento.schema');
TipoPlan = require('./api/tipoPlan/tipoPlan.schema');
TablaComposicions = require('./api/seguimiento/tablaComposicion.schema');
Plato = require('./api/platos/platos.schema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routes
var pacienteRoutes = require('./api/pacientes/pacientes.routes');
var seguimientoRoutes = require('./api/seguimiento/seguimiento.routes');
var tipoPlanRoutes = require('./api/tipoPlan/tipoPlan.routes');
var platoRoutes = require('./api/platos/platos.routes');

// register routes
pacienteRoutes(app);
tipoPlanRoutes(app);
seguimientoRoutes(app);
platoRoutes(app);

app.listen(port);

console.log('Servidor Corriendo: ' + port);