import app from './app.js';
import  dotenv from 'dotenv';

dotenv.config();

if(!process.env.PORT) throw new Error("environment PORT not defined")

app()
.then(server => {
  server.listen(process.env.PORT, () => {
    console.log(`Server magic happen start at: http://localhost:${process.env.PORT}`)
  })
})
.catch(err => {
  console.error(err);
  console.log("Oops, Something Went Wrong")
})