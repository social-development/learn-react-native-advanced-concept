const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: 'Phone number is required!' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+12052361303 '
      })
    })
    .catch(err => {
      res.status(422).send({ error: err });
    });
}