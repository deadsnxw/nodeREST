cconst bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');
const keys = require('../config/keys');

module.exports.login = async (req, res) => {
    const userDb = await User.findOne({ email: req.body.email })
    if (userDb) {
        const isRulePassw = bcrypt.compareSync(req.body.password, userDb.password)

        if (isRulePassw) {
            const token = jwt.sign({
                email: userDb.email,
                userId: userDb._id
            }, keys.jwtKey, {expiresIn: 60*60*2})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            errorHandler(res, 401, 'Password is incorrect')
        }
    } else {
        errorHandler(res, 404, 'User not found')
    }
}


module.exports.register = async (req, res) => {
    const userDb = await User.findOne({email: req.body.email});

    if (userDb) {
        return res.status(409).json({
            error: 'Email already exists'
        });
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const passw = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: passw
        });

        await newUser.save();
        return res.status(201).json(newUser);

    } catch (e) {
        errorHandler(res, 500, e);
    }
}