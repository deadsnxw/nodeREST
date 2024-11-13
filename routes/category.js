const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}),controller.getById);
router.post('/', passport.authenticate('jwt', {session: false}),controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}),controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}),controller.delete);


module.exports = router;