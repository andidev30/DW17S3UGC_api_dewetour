const {
    Country
} = require('../models')
const joi = require('@hapi/joi');

exports.shows = async (req, res) => {
    try {
        const data = await Country.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            message: "response success",
            data

        })
    } catch (e) {
        res.status(500).send({
            error: {
                message: "Internal server error"
            }
        })
    }
}

exports.show = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const data = await Country.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            message: "response success",
            data
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error"
            }
        })
    }
}

exports.store = async (req, res) => {
    try {
        // const {
        //     name
        // } = req.body
        const schema = joi.object({
            name: joi.string().min(2).required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const data = await Country.create(req.body)

        res.status(200).send({
            data: {
                id: data.id,
                name: data.name
            }
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error"
            }
        })
    }
}

exports.update = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const schema = joi.object({
            name: joi.string().min(2).required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const data = await Country.update(
            req.body, {
                where: {
                    id
                }
            })

        if (data) {

            const checkId = await Country.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if (!checkId) return res.status(400).send({
                error: {
                    message: "can't update. id is incorect"
                }
            })

            res.status(200).send({
                message: "response success",
                data: checkId
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error"
            }
        })
    }
}

exports.destroy = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const checkId = await Country.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'name']
            }
        })

        if (!checkId) {
            return res.status(400).send({
                error: {
                    message: "can't delete. id is incorect"
                }
            })
        } else {
            const data = await Country.destroy({
                where: {
                    id
                }
            })

            return res.status(200).send({
                message: "response success",
                id
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message
            }
        })
    }
}