const mongoose =require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema(
{
    keyword: {type:String},
   replacewith : {type:String}
});
const Words =mongoose.model("words",schema);
module.exports= Words;