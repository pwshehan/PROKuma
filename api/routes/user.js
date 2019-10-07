const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

const Utils = require('../utils/utils');

router.post('/signup', User.sign_up);

router.post('/login', User.log_in);

// router.delete('/:userId', (req, res, next) => {
//     User.remove({ _id: req.params.userId })
//     .exec()
//     .then( result => {
//         res.status(200).json({
//             message: "User deleted"
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// });

router.post("/my", function(req, res, next) {
    const main_fields = [
      'name',
      'price',
      'age',
    ];

    const validateInputs = Utils.requiredFieldsValidated(req.body, main_fields);
    if (validateInputs != null) {
      throw validateInputs;
    }

    if (req.hashValidation) {
      const validateHash = Utils.hashValidated(req.body, main_fields);
      if (validateHash != null) {
        throw validateHash;
      }
    }

    res.json({ep:'hj'});
});

module.exports = router;
