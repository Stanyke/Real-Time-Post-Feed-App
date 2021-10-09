# Real-Time-Post-App-Using-Node.js-React.js-Socket.js With Nested Comments
Real Time Post App Using Node.js, React.js, Socket.js, with nested comments.


This app is supported by socket io for its real-time activities across all devices and is built on top Nodejs, Reactjs, Material UI, socket io, MongoDb.js, also you are able to create a post and add comments including nested comments.

# <u>How To Use This App</u>

- This app can be run concurrently on local, using *<i>yarn run dev</i>*. Also, it can be run independently (the backend and frontend) by going into the frontend or backend folder from the root directory, and running *<i>yarn run dev</i>* and *<i>yarn start</i>* respectively.

- However, you need to install you must run either *<i>yarn</i>* or *<i>npm install</i>* first either on the root directory of this app or inside of the backend and frontend.

<u><b>Backend Setup</b></u>

You need to create a .env file on the root directory of the backend folder.

This env file requires some data to enable the backend or server function properly and they are the following:

- PORT = 5000
- DB_URI = mongodb+srv://<username>:<password>@cluster0.xdfbn.mongodb.net/appName?retryWrites=true&w=majority

    - Note you may use any port you want as this is dynamic.
    - As we're using MongoDB for our database, you need to set up an account and collect the URI and the <username> with the username of your DB collection and <password> with the appropriate password.

<br/>
<u><b>Frontend Setup</b></u>

You also need to create a .env file on the root directory of the frontend folder.

They are the following:

- REACT_APP_SERVER_URL = --Replace with backend url-- e.g http://localhost:5000 or live url
- REACT_APP_AFTER_LOGIN_REDIRECT_URL = /dashboard
- REACT_APP_BEFORE_LOGIN_REDIRECT_URL = /
- REACT_APP_PLATFORM_NAME = --Replace with any name you would want to give this app-- e.g Real Time Post App 
- REACT_APP_VIEW_POST_URL = view-post

    - Note the other should be set like this, if in case you change them, refer to the code on the frontend directory to adjust the component or pages names.

# Thank you