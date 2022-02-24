const express = require('express');
const router = express.Router();
const { UsersModel } = require('../models/usersModel');
const {PostModel} = require('../models/postsModel');
const ObjectID = require('mongoose').Types.ObjectId;

// get data by ID
router.get('/users/register/all', (req, res) => {

    UsersModel.find().then((users) => {
        if(!users) {
            return res.status(404).send();
        }
        res.send({users});
    }).catch((e) => {
        res.status(400).send();
    });
}); 

// post data
router.post('/users/register', (req, res) => {
    const newRecord = new UsersModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password
    });

    newRecord.save((err, user) => {
        if(!err) res.send(user);
        else console.log("error creating new user : " + err);
    })
})

// update data
router.put("/users/register/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)

    const updateRecord = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password
    };
    
    UsersModel.findByIdAndUpdate(
        req.params.id,
        { $set : updateRecord },
        { new: true },
        (err, user) => {
            if(!err) res.send(user);
            else console.log("update error : "+err);
        }
    )
});

//delete
router.delete("users/register/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)

    UsersModel.findByIdAndRemove(
        req.params.id,
        (err, user) => {
            if(!err) res.send(user);
            else console.log("delete error : " +err);
        }
    )
    
});
module.exports = router