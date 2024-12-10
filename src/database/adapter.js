const DB = require("./db.json")
const fs = require("fs")


const getAllWorkouts = (filterParams) => {
    try{
        let workouts = DB.entrenamientos;
        if (filterParams.modo && filterParams.limit) {
            const copia = workouts.filter((workout) => workout.modo.toLowerCase().includes(filterParams.modo.toLowerCase()));
            return copia.splice(0, filterParams.limit)
        }
        if (filterParams.modo) {
            return workouts.filter((workout) => workout.modo.toLowerCase().includes(filterParams.modo.toLowerCase()));
        }
        if (filterParams.limit) {
            return workouts.splice(0, filterParams.limit)
        }

        return workouts
    } catch ( error ) {
        throw { status: 500, message: error};
    }

}

const createNewWorkouts = (workoutToInsert) => {
    const isAlreadyAdded = DB.entrenamientos.find((value) => value.nombre === workoutToInsert.nombre);
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `El entrenamiento con el nombre ${workoutToInsert.nombre} ya existe`
        }
    }
    try {
        DB.entrenamientos.push(workoutToInsert)
        saveToDatabase(DB)
        return workoutToInsert
    } catch (error) {
        throw { status: 500, message: error?.message || error }
    }


}

const getOneWorkouts = (id) => {
    const searchWorkouts = DB.entrenamientos.find((value) => value.id === id)
    return searchWorkouts
}

const saveToDatabase = () => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
        encoding: "utf8",
    });
};

const deleteOneWorkouts = (id) => {
    const entrenamientoBorrar = DB.entrenamientos.find((value) => value.id === id)
    if(entrenamientoBorrar !== undefined){
        DB.entrenamientos = DB.entrenamientos.filter((value) => value.id !== id)
        saveToDatabase()
    }
    
    return entrenamientoBorrar
}

const updateOneWorkouts = (id, body) => {
    let temp;
    DB.entrenamientos.forEach((value) => {
        if (value.id === id) {
            value.nombre = (body.nombre) ? body.nombre : value.nombre
            value.modo = (body.modo) ? body.modo : value.modo
            value.equipamiento = (body.equipamiento) ? body.equipamiento : value.equipamiento
            value.ejercicios = (body.ejercicios) ? body.ejercicios : value.ejercicios
            value.consejosDelEntrenador = (body.consejosDelEntrenador) ? body.consejosDelEntrenador : value.consejosDelEntrenador
            value.fechaActualizacion = new Date().toLocaleDateString("en-US", { timeZone: "UTC" })
            temp = value
        }
    })

    saveToDatabase()
    return temp
}


module.exports = {
    getAllWorkouts,
    createNewWorkouts,
    getOneWorkouts,
    deleteOneWorkouts,
    updateOneWorkouts
}