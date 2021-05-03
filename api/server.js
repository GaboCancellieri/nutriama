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
Paciente = require('./pacientes/pacientes.schema');
Seguimiento = require('./seguimiento/seguimiento.schema');
TipoPlan = require('./tipoPlan/tipoPlan.schema');
TablaComposicions = require('./seguimiento/tablaComposicion.schema');
Plato = require('./platos/platos.schema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routes
var pacienteRoutes = require('./pacientes/pacientes.routes');
var seguimientoRoutes = require('./seguimiento/seguimiento.routes');
var tipoPlanRoutes = require('./tipoPlan/tipoPlan.routes');
var platoRoutes = require('./platos/platos.routes');

// register routes
pacienteRoutes(app);
tipoPlanRoutes(app);
seguimientoRoutes(app);
platoRoutes(app);

app.listen(port);

console.log('Servidor Corriendo: ' + port);