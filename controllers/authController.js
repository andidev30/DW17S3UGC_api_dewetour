const {User} = require('../models');
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');

exports.register = async (req, res) => {
    try {
        const {fullName, email, password, phone, address} = req.body

        const schema = joi.object({
            fullName : joi.string().min(2).required(),
            email : joi.string().email().min(7).required(),
            password : joi.string().min(8).required(),
            phone: joi.string().min(11).required(),
            address: joi.string().min(10).required()
        })

        const {error} = schema.validate(req.body)

        if (error) return res.status(400).send({
            error : {
                message: error.details[0].message
            }
        })

        const checkEmail = await User.findOne({
            where : {
                email
            }
        })

        if(checkEmail) return res.status(400).send({
            error : {
                message : "user already exist"
            }
        })

        const saltRound = 10
        const hashPassword = await bycript.hash(password, saltRound)

        const data = await User.create({
            fullName,
            email,
            password: hashPassword,
            phone,
            address
        })

        const token = jwt.sign({
            id: data.id
        }, process.env.HASHPASSWORD)

        res.status(200).send({
            message: "you have been registered",
            data : {
                email: data.email,
                token
            }
        })
    } catch (error) {
        res.status(200).send({
            error : {
                message: "Internal server error"
            }
        })
    }
}