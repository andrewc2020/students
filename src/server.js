import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import connectDb from './models';
import cors from 'cors';




// Instantiate express
const app = express();
// Set our port
const port = process.env.PORT || 8000;
// Configure app to user bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Register our routes in app

app.use('/', routes);

app.use(cors());




// Start our server

connectDb().then(async ()=>{
    await app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})
    




// Export our app for testing purposes
export default app;
