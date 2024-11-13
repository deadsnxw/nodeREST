const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: {
        type: String,
            required: true,
    },
    imageSrc: {
        type: String,
            default: ''
    },
    // user: {
    //     ref: 'users',
    //         type: schema.Types.ObjectId
    // }
});

module.exports = mongoose.model('categories', categorySchema);