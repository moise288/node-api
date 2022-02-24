const express = require('express');
const router = express.Router();
const { PostsModel } = require('../models/postsModel');
const ObjectID = require('mongoose').Types.ObjectId;

// get data by Id
router.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    PostsModel.findById(id).then((user) => {
        if(!user) {
            return res.status(404).send();
        }
        res.send({user});
    }).catch((e) => {
        res.status(400).send();
    });
}); 

// post data
router.post('/user', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if(!err) res.send(docs);
        else console.log("error creating new data : " + err);
    })
})

// update data
router.put("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)

    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };
    
    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set : updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("update error : "+err);
        }
    )
});

//delete
router.delete("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id)

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("delete error : " +err);
        }
    )
    
});
module.exports = router