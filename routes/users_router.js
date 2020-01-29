const router = require('express').Router();
const bycrypt = require('bcryptjs');
const Users = require('./user_model.js');
const restricted = require('../api/restrictedMiddleware');

router.post('/register', (req, res) =>{
    let { username, password } = req.body;
    const hash = bycrypt.hashSync(password, 8);

    Users.add({ username, password: hash })
    .then(saved =>{
        res.status(200).json(saved);
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) =>{
    let { username, password } = req.body;

    Users.findById({ username })
    .first()
    .then(user => {
        if (user && bycrypt.compareSync(password, user.password)){
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}! `})
        }else{
            res.status(400).json({ message: "You... shall not... pass!" })
        };
    })
    .catch(err =>{
        res.status(500).json(err);
    });
});

router.get("/users", restricted, (req, res)=>{
    Users.find()
    .then(users => {
        res.json.json(users);
    })
    .catch(err =>{
        res.status(500).send(err)
    });
});

router.get('/logout', (req, res) =>{
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(401).json({ errorMessage: "No User to Logout" })
            }else{
                res.status(200).json({ message: "You have been logged out"})
            }
        })
    }
})

module.exports = router;

