const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const indexRoutes = require('./routes/index')
const {localPort} = require('./bin/config');
const dbConfiguration = require('./bin/db');

const server = require('http').createServer(app);

exports.io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: '*'
    }
});

dbConfiguration();

require('./socket');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//intialize all routes
indexRoutes(app);

const port = process.env.PORT || localPort;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});