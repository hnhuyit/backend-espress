// module.exports = (mongoose, mongoosePaginate) => {
//     var schema = mongoose.Schema(
//         {
//             title: String,
//             description: String,
//             published: Boolean
//         },
//         { timestamps: true }
//     );


//     schema.plugin(mongoosePaginate);

//     // schema.method("toJSON", function () {
//     //     const { __v, _id, ...object } = this.toObject();
//     //     object.id = _id;
//     //     return object;
//     // });

//     const Tutorial = mongoose.model("tutorial", schema);
//     return Tutorial;
// };


var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

var TutorialSchema = mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
    },{ 
        timestamps: true 
    });

    TutorialSchema.plugin(mongoosePaginate);

var Tutorial = mongoose.model("Tutorial", TutorialSchema);

module.exports = Tutorial;