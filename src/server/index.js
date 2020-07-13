//CREATE LOCAL SERVER
//import app from '../server/server';
const app= require('../server/server')

const port = parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => console.log(`Live at ${port}`));


