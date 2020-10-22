// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//         {
//             title: String,
//             description: String,
//             published: Boolean
//         },
//         { timestamps: true }
//     );

//     // schema.method("toJSON", function () {
//     //     const { __v, _id, ...object } = this.toObject();
//     //     object.id = _id;
//     //     return object;
//     // });

//     const Products = mongoose.model("product", schema);
//     return Products;
// };


var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

var ProductSchema = mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
    },{ 
        timestamps: true 
    });

    ProductSchema.plugin(mongoosePaginate);

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;