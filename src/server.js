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


//use config module to get the privatekey, if no private key set, end the application
if (!process.env.my_private_key) {
    console.error("FATAL ERROR: my_private_key is not defined.");
    process.exit(1);
  }
// Register our routes in app
app.use(cors());

app.use('/', routes);





// Start our server

connectDb().then(async ()=>{
    await app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})
    




// Export our app for testing purposes
export default app;
