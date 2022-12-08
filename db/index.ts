import mongoose from 'mongoose';


type IExercise = {
    startTime: Date,
    durationInSeconds: Number,
    activityType: "running" | "walking" | "biking"
}

const exerciseSchema = new mongoose.Schema<IExercise>({
    startTime: Date,
    durationInSeconds: Number,
    activityType: String
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

export const createExercise = (exercise: IExercise) => {
   return (new ExerciseModel(exercise)).save();
}
export const getAllExercises = async () => {
   const returnValue = await ExerciseModel.find({})
   return returnValue
}
export const getExerciseById = async (id: string) => {
   try{
      const resp = await ExerciseModel.findById(id);
      return resp
   }catch(err){
      return err
   }
}

type ExerciseType = {
   startTime: string,
   durationInSeconds: number,
   activityType: string
}

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
export const isValidExercise = (exercise: ExerciseType) => {
   let errors = []
   if(!exercise.startTime){
      errors.push('exercise needs a starttime')
   }
   if(!exercise.durationInSeconds){
      errors.push('exercise needs a duration (in seconds)')
   }
   if(!exercise.activityType){
      errors.push('exercise needs an activityType')
   }
   return errors
}

// export default { createExercise, getAllExercises, getExerciseById }