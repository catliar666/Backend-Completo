const Workouts = require("../database/adapter")
const { v4: uuid } = require("uuid")



const getAllWorkouts = (filterParams) => {
   try{
    const allWorkouts = Workouts.getAllWorkouts(filterParams)

    return allWorkouts;
   }catch(error){
    throw error
   }
}

const getOneWorkouts = (id) => {
    if(id){
        const oneWorkouts = Workouts.getOneWorkouts(id)
        return oneWorkouts;
    }
    
}

const createNewWorkouts = (newWorkout) => {
    const workoutToInsert = {
        id: uuid(),
        ...newWorkout,
        fechaCreacion: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
        fechaActualizacion: new Date().toLocaleDateString("en-US", { timeZone: "UTC" })
    }
    try {
        const createWorkouts = Workouts.createNewWorkouts(workoutToInsert)
        return createWorkouts;
    } catch (error) {
        throw error
    }


}

const updateOneWorkouts = (id, body) => {
    const workoutUpdate = Workouts.updateOneWorkouts(id, body)
    return workoutUpdate;
}

const deleteOneWorkouts = (id) => {
    const code = Workouts.deleteOneWorkouts(id)
    
    return code;
}

module.exports = {
    getAllWorkouts,
    getOneWorkouts,
    createNewWorkouts,
    updateOneWorkouts,
    deleteOneWorkouts
}
