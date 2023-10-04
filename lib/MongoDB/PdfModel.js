// import mongoose from 'mongoose'

// const Schema = mongoose.Schema;

// const PdfSchema = new Schema({
//   fileName: {
//     type: String,
//     required: [true, 'Filename is a required field.'],
//     trim: true,
//     maxLength: 100,
//     unique: false,
//   },
//   fileUrl: {
//     type: String,
//     required: [true, 'File Url is a required field.'],
//     trim: true,
//     maxLength: 500,
//     unique: true,
//   },
//   isProcessed: {
//     type: Boolean,
//     default: false,
//   },
//   vectorIndex: {
//     type: String,
//     maxLength: 100,
//     unique: true,
//     required: false,
//   },
// }, {
//   timestamps: true,
// });
// for(let model in mongoose.models){
//     delete mongoose.models[model]
// }
// const PdfModel = mongoose.models.PdfModel || mongoose.model('PdfModel', PdfSchema);


// export default PdfModel;