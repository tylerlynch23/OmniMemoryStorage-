/* app.js
 * The main file - launches the server, sets up the database, routing,
 * middleware, the static folder, etc.
 */
const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');
const mongoose   = require('mongoose');
const path       = require('path');
const passport   = require('passport');

const users  = require('./routes/users');
const config = require('./config/database')

const app   = express();
const port  = 3000;

setupApp();

function setupApp(){
  initMiddleware();
  initApp();
  connectDatabase();
}

/* initApp
 * Starts the server and listens for connections on the port defined above, and
 * then calls other functions to setup different components of the application.
 */
function initApp(){
  app.listen(port, () => {
    console.log('\nServer started on port ' + port + '...');
  });
  setupStaticFolder();
  setupRoutes();
}

/* connectDatabase
 * Sets up the database based on settings defined in config/database.config.
 * Verifies connection or prints out the error on database connection failure.
 */
function connectDatabase(){
  mongoose.connect(config.database, {
    useMongoClient: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database + '...');
  });
  mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
  });

}

/* setupStaticFolder
 * Links the application to the static folder
 */
function setupStaticFolder(){
  app.use(express.static(path.join(__dirname, 'static')));
}

/* initMiddleware
 * Sets up the middleware for:
 *   - CORS: Cross Origin Resource Sharing - allows requests to be made to our
 *           app to a different domain name.
 *   - Body-parser - Parses the body of incoming requests such as forms
 */
function initMiddleware(){
  app.use(cors());
  app.use(bodyParser.json());
}

/* setupRoutes
 * Connects the app to different routers, defined within the routes folder,
 * which then take care of the routing.
 */
function setupRoutes(){
  app.use('/users', users);
}
