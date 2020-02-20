const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const moment = require('moment');

// TODO: adjust path of post/get
router.post('/', (req, res) => {

    const date = req.body.date;

    // Validate date format
    if(!moment(date, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({"error": "Invalid date format. Use YYYY-MM-DD."});
    }

    Prediction.findOne({date: date}).exec()
        .then((prediction) => {
            if(prediction == null) {
                const prediction = new Prediction({
                    date: date,
                    gamePicks: req.body.gamePicks
                });
            
                prediction.save()
                    .then((newPrediction) => {
                        // TODO: Go over what is being returned back to client
                        // TODO: should return location of new prediction
                        return res.status(200).json(prediction);
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).send();
                    });
            } else {
                return res.status(400).send({"error": "Date " + date + " already submitted"});
            }
        })
        .error((err) => {
            console.error(err);
            return res.status(500).send("Error ");
        });
});

router.get('/', (req, res) => {
    const date = req.query.date;

    // Validate date format
    if(!moment(date, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({"error": "Invalid date format. Use YYYY-MM-DD."});
    }

    Prediction.findOne({date: date}).exec()
        .then((prediction) => {
            if(prediction != null) {
                return res.status(200).json(prediction);
            } else {
                return res.status(404).send({"error": "Cannot find prediction with date " + date});
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({"error": "Error trying to find prediction with date " +  date});
        });
});

module.exports = router;