const express = require('express')
const router = express.Router()
const actionModel = require('../models/action')

router.post('/addAction', async (req, res) => {

    var actionDetail = new actionModel()

    actionDetail.actionName = req.body.actionName

    actionDetail.save(function(err){
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json("Action Added")
        }
    })
})

router.get('/getAction', async (req, res) => {
    try {
        const actionAllDetail = await actionModel.find({})
        res.status(200).json(actionAllDetail)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/updateAction/:id', async (req, res) => {
    try {
        const updateAction = await actionModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.status(200).json("Updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/deleteAction/:id', async (req, res) => {
    const deleteAction = await actionModel.findById(req.params.id);
    try {
        await deleteAction.delete()
        res.status(200).json("Action Deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router