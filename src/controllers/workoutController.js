const workoutService = require("../services/workoutService")

const getAllWorkouts = (req, res) => {
    const { modo } = req.query;
    const { limit } = req.query;
    try{
    const allWorkouts = workoutService.getAllWorkouts({modo, limit})
        res.send({ status: "OK", data: allWorkouts })
    }catch (error) {
        res.status(500).send({
            status: "FAILED",
            data: {
                error:
                    "Error interno del servidor"
            }
        })
    }
}

const getOneWorkouts = (req, res) => {
    const id = req.params.workoutId
    if(!id){
        res.status(402).send({
            status: "FAILED",
            data: {
                error:
                    "Falta el id"
            }
        })
        return
    }
    const oneWorkouts = workoutService.getOneWorkouts(id)

    if (oneWorkouts){
        res.status(201).send({ status: "OK", data: oneWorkouts })
    }else{
        res.status(404).send({
            status: "FAILED",
            data: {
                error:
                    "No se encuentra el entrenamiento"
            }
        })
        return
    }

}

const createNewWorkouts = (req, res) => {
    const { body } = req
    if (!body.nombre ||
        !body.modo ||
        !body.equipamiento ||
        !body.ejercicios ||
        !body.consejosDelEntrenador
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "Uno de los siguientes campos a fallado uno de los campos (nombre, modo, ejercicios, equipamiento, consejos del entrenador)"
            }
        })
        return
    } else {
        const newWorkout = {
            nombre: body.nombre,
            modo: body.modo,
            equipamiento: body.equipamiento,
            ejercicios: body.ejercicios,
            consejosDelEntrenador: body.consejosDelEntrenador
        }

        try {
            const createNewWorkouts = workoutService.createNewWorkouts(newWorkout)
            res.status(201).send({ status: "OK", data: createNewWorkouts })
        } catch (error) {
            res
                .status(error?.status || 500)
                .send({ status: 'FAILED', data: { error: error?.message || error } })
        }


    }


}

const updateOneWorkouts = (req, res) => {
    const id = req.params.workoutId
    const { body } = req
    const updateWorkouts = workoutService.updateOneWorkouts(id, body)
    res.status(201).send({ status: "OK", data: updateWorkouts })
}

const deleteOneWorkouts = (req, res) => {
    const id = req.params.workoutId
    
    const deletedWorkouts = workoutService.deleteOneWorkouts(id)
    
    if(!deletedWorkouts){
        res.status(404).send({
            status: "FAILED",
            data: {
                error:
                    "No se encuentra el entrenamiento"
            }
        })
        return
        
    }else{
        res.status(201).send({ status: "OK", data: deletedWorkouts })
    }
   
}

module.exports = {
    getAllWorkouts,
    getOneWorkouts,
    createNewWorkouts,
    updateOneWorkouts,
    deleteOneWorkouts
}