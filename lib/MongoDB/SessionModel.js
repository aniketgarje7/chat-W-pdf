import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  dataArray:{
    type:Array,
    required: [true, 'dataArray is a required field.'],
  }

}, {
  timestamps: true,
});
for(let model in mongoose.models){
    delete mongoose.models[model]
}
const DataModel = mongoose.models.DataModel || mongoose.model('DataModel', dataSchema);


export default DataModel;