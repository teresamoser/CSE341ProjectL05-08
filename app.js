// const express = require('express');
// const cors = require ('cors');
// const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// const bodyParser = require('body-parser');
// const mongodb = require('./lesson02/db/connect');

// app
//   .use('/api-docs', swaggerUi.service, swaggerUi.setup(swaggerDocument))
//   .use(cors())
//   .use(express.json())
//   .use(express.urlencoded({extended: true}))
//   .use('./', require('./planetsProject/routes'));


  // .use(bodyParser.json())
  // .use((req, res, next) =>{
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   next();
  // })

// const db = require('./models');
//   db.mongoose
//   .connect(db.url,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to the Database!');
//   })
//   .catch((err) => {
//     console.log('Cannot connect to the Database!', err);
//     process.exit();
//   });

  // const PORT = process.env.PORT || 8080;
  // app.listen(PORT, () => {
  //   console.log(`Server is running on ${PORT}.`)
  // });
  

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   }else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
//   });