const Pet= require('../models/pet.model')

module.exports = {
    create: (req, res) => {
        Pet.create(req.body)
            .then( result => {
                res.status(201).json(result)
            })
            .catch( err => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    getAll: (req, res) => {
        Pet.find()
            .then( result => {
                res.json(result)
            })
            .catch( err => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    getOne: (req, res) => {
        Pet.findOne({ _id: req.params.id })
            .then(result=> {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    update: (req, res) => {
        Pet.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then( result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    delete: (req, res) => {
        Pet.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    }
}