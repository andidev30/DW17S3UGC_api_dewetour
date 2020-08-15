const {
    User
} = require('../models')

exports.shows = async (req, res) => {
    try {
        const data = await User.findAll()

        res.status(200).send({
            message: "response success",
            data
        })
    } catch (error) {
        res.status(500).send({
            error: {
                message: "Internal Server Erro"
            }
        })
    }
}

exports.show = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const data = await User.findOne({
            where: {
                id
            }
        })

        if (!data) return res.status(400).send({
            message: `user with id ${id} is not existed`
        })

        res.status(200).send({
            message: "response success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                message: "Internal Server Error"
            }
        })
    }
}

exports.destroy = async (req, res) => {
    try {
        const {id} = req.params
        const data = await User.destroy({
            where : {
                id
            }
        })

        if (!data) return res.status(400).send({
            message: `user with id ${id} is not existed`
        })

        res.status(200).send({
            message: "response success",
            id: id
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                message: "Internal Server Error"
            }
        })
    }
}