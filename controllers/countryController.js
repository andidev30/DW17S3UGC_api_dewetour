const {
    Country
} = require('../models')

exports.shows = async (req, res) => {
    try {
        const data = await Country.findAll()

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
        const {id} = req.params

        const data = await Country.findOne({
            where : {
                id
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