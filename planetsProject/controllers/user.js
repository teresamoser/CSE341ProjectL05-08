// const db = require('../models');
// const User = db.user;
// //const passwordUtil = require('../util/passwordComplexityCheck');

// module.exports.create = (req, res) => {
//   try {
//     if (!req.body.username || !req.body.password) {
//       res.status(400).send({ message: 'Content can not be empty!' });
//       return;
//     }
//     const password = req.body.password;
//     const passwordCheck = passwordUtil.passwordPass(password);
//     if (passwordCheck.error) {
//       res.status(400).send({ message: passwordCheck.error });
//       return;
//     }
//     const user = new User(req.body);
//     user
//       .save()
//       .then((data) => {
//         console.log(data);
//         res.status(201).send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || 'Some error occurred while creating the user.'
//         });
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };