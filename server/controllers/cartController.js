const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const {id} = req.params
        
        const index = req.session.user.cart.findIndex(swag => +swag.id === +id)

        if (index === -1){
            const selectedSwag = swag.find(swag => +swag.id === +id)
            req.session.user.push(selectedSwag)
            req.session.user.total =+ selectedSwag.price
        }
        res.status(200).send(req.session.user)
    },
    delete: (req, res) => {
        const {id} = req.params

        const index = req.session.user.cart.findIndex(swag => +swag.id === +id)
        const selectedSwag = swag.find(swag => +swag.id === +id)
        if (index !== -1){
            req.session.user.cart.splice(index, 1)
            user.total -= selectedSwag.price
            res.status(200).send(req.session.user)
        }
    },
    checkout: (req, res) => {

    }
}