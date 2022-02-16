const express = require('express');
const router = express.Router();
const { PostsModel } = require('../models/postsModel');
const ObjectID = require('mongoose').Types.ObjectId;


router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("error to get data : " + err);
    })
})

router.post('/', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if(!err) res.send(docs);
        else console.log("error creating new data : " + err);
    })
})

// update
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