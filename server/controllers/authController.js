const users = require('../models/users')
let id = 1

module.exports = {
    register: (req, res) => {
        const {username, password} = req.body

        users.push({id, username, password})
        id++
        req.session.user.username = username
        res.status(200).send(req.session.user)
    },
    login: (req, res) => {
        const {username, password} = req.body
        const user = users.find(user => user.username === username && user.password === password) // The parameter 'user' in the .find references
        // each element within the users array. Then it compares itself against 'username' & 'password' from req.body (what the client puts in)
        if (user){
            req.session.user.username = user.username // If user is truthy then it runs the code
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('Nadda bro')
        }
    },
    signout: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}