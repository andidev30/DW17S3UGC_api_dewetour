const {
    Transaction,
    Trip,
    Country
} = require('../models')

const joi = require('@hapi/joi')

exports.store = async (req, res) => {
    try {
        const schema = joi.object({
            counterQty: joi.number().integer().required(),
            total: joi.number().integer().required(),
            status: joi.string().min(4).required(),
            attachment: joi.string().min(4).required(),
            tripid: joi.number().integer().required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const data = await Transaction.create(req.body)

        if (data) {
            const result = await Transaction.findOne({
                where: {
                    id: data.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'tripid']
                },
                include: {
                    model: Trip,
                    as: "Trip",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'countryId']
                    },
                    include: {
                        model: Country,
                        as: "Country",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                }
            })

            res.status(200).send({
                message: "response success",
                data: result
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

exports.update = async (req, res) => {
    try {
        const schema = joi.object({
            counterQty: joi.number().integer().required(),
            total: joi.number().integer().required(),
            status: joi.string().min(4).required(),
            attachment: joi.string().min(4).required(),
            tripid: joi.number().integer().required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

        const {
            id
        } = req.params

        const data = await Transaction.update(
            req.body, {
                where: {
                    id
                }
            })

        if (data) {

            const result = await Transaction.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'tripid']
                },
                include: {
                    model: Trip,
                    as: "Trip",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'countryId']
                    },
                    include: {
                        model: Country,
                        as: "Country",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                }
            })

            if (!result) return res.status(400).send({
                error: {
                    message: "can't update. id is incorect"
                }
            })

            res.status(200).send({
                message: "response success",
                data: result
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}

exports.show = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const result = await Transaction.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tripid']
            },
            include: {
                model: Trip,
                as: "Trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'countryId']
                },
                include: {
                    model: Country,
                    as: "Country",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            }
        })

        if (!result) return res.status(400).send({
            error: {
                message: "can't read. id is incorect"
            }
        })

        res.status(200).send({
            message: "response success",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}

exports.shows = async (req, res) => {
    try {
        const result = await Transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tripid']
            },
            include: {
                model: Trip,
                as: "Trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'countryId']
                },
                include: {
                    model: Country,
                    as: "Country",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            }
        })

        res.status(200).send({
            message: "response success",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal server error",
                log: error.message,
            },
        });
    }
}