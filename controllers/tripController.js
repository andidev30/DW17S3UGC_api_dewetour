const {
  Trip,
  Country
} = require("../models")
const joi = require("@hapi/joi")

exports.shows = async (req, res) => {
  try {
    const data = await Trip.findAll({
      include: {
        model: Country,
        as: "Country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["countryId", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "response success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: "Internal server error",
        log: error.message,
      },
    });
  }
};

exports.show = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await Trip.findOne({
      include: {
        model: Country,
        as: "Country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["countryId", "createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });

    res.status(200).send({
      message: "response success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: "Internal server error",
        log: error.message,
      },
    });
  }
};

exports.store = async (req, res) => {
  try {
    const schema = joi.object({
      title: joi.string().min(2).required(),
      countryId: joi.number().integer().required(),
      accomodation: joi.string().min(2).required(),
      transportation: joi.string().min(2).required(),
      eat: joi.string().min(2).required(),
      day: joi.number().integer().min(1).required(),
      night: joi.number().integer().min(1).required(),
      dateTrip: joi.date().required(),
      price: joi.number().integer().required(),
      quota: joi.number().integer().required(),
      description: joi.string().min(2).required(),
      image: joi.string().min(3).required()
    })

    const {
      error
    } = schema.validate(req.body)

    if (error) return res.status(400).send({
      error: {
        message: error.details[0].message
      }
    })

    const data = await Trip.create(req.body)

    if (data) {
      const result = await Trip.findOne({
        where: {
          id: data.id
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
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

exports.update = async (req, res) => {
  try {
    const schema = joi.object({
      title: joi.string().min(2).required(),
      countryId: joi.number().integer().required(),
      accomodation: joi.string().min(2).required(),
      transportation: joi.string().min(2).required(),
      eat: joi.string().min(2).required(),
      day: joi.number().integer().min(1).required(),
      night: joi.number().integer().min(1).required(),
      dateTrip: joi.date().required(),
      price: joi.number().integer().required(),
      quota: joi.number().integer().required(),
      description: joi.string().min(2).required(),
      image: joi.string().min(3).required()
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

    const data = await Trip.update(
      req.body, {
        where: {
          id
        }
      })

    if (data) {

      const checkId = await Trip.findOne({
        include: {
          model: Country,
          as: "Country",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["countryId", "createdAt", "updatedAt"],
        },
        where: {
          id,
        },
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
        message: "Internal server error",
        log: error.message,
      },
    });
  }
}

exports.destroy = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const checkId = await Trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "name"],
      },
    });

    if (!checkId) {
      return res.status(400).send({
        error: {
          message: "can't delete. id is incorect",
        },
      });
    } else {
      const data = await Trip.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({
        message: "response success",
        id,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        message: "Internal server error",
        log: error.message,
      },
    });
  }
};