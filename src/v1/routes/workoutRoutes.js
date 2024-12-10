const express = require("express")
const router = express.Router()
const workoutController = require("../../controllers/workoutController")
const apicache = require('apicache')
const cache = apicache.middleware("1 minute")

router.get("/" , cache,workoutController.getAllWorkouts);

router.get("/:workoutId" , workoutController.getOneWorkouts);

router.post("/" , workoutController.createNewWorkouts);

router.patch("/:workoutId" , workoutController.updateOneWorkouts);

router.delete("/:workoutId" , workoutController.deleteOneWorkouts);


module.exports = router