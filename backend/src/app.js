import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.disable("etag");  //disable etag to prevent caching of responses

//cross origin resource sharing(CORS) configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '' })); //middleware to parse json data in request body and limit size to prevent large payloads
app.use(express.urlencoded({ extended: true, limit: '50kb' })); //middleware to parse urlencoded data and limit size
app.use(cookieParser());//third party operations on the cookies
app.use(express.static('public'));//middleware to serve static files from 'public' directory

//routes import

import userRoutes from './routes/user.routes.js';
import videoRoutes from './routes/video.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

//routes declaration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/playlists', playlistRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);


export { userRoutes, videoRoutes, subscriptionRoutes, playlistRoutes, dashboardRoutes };

export default app;

//cookies: small files stored on client side (browser) to store user session data and preferences
//In express, we use cookie-parser middleware to parse cookies from incoming requests and set cookies in responses.
//It provides easy access to cookies via req.cookies and res.cookie() methods.
//CORS: Cross-Origin Resource Sharing is a security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page.
//In express, we use the cors middleware to configure CORS settings, allowing or restricting cross-origin requests based on specified rules.
//This is important for enabling secure interactions between frontend and backend hosted on different domains.

//dotenv: dotenv is a zero-dependency module that loads environment variables from a .env file into process.env in Node.js applications.
//This allows developers to manage configuration settings (like API keys, database URIs, etc.) separately from the codebase, enhancing security and flexibility across different environments (development, testing, production).

//mongoose async/await: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides a straightforward, schema-based solution to model application data.
//Using async/await with Mongoose allows developers to write asynchronous database operations in a more synchronous and readable manner.
//This helps in handling operations like connecting to the database, querying, and updating documents without blocking the event loop, leading to cleaner and more maintainable code.


