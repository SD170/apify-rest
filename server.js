/*
    Main logic/solution of the problem is in /controllers/products.controllers.js
*/

/*
    Created a proper file structure, and dividec codebase into routes,controllers, middlewares.
*/

const express = require('express');

//route files
const products = require('./routes/products');



const app = express();

//body parser
app.use(express.json());


//mount routers
app.use('/api/products',products);


const PORT = 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));


//handle unhandled PromeseRejection
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    
    //Close Server & exit process
    server.close(()=> process.exit(1));
})

