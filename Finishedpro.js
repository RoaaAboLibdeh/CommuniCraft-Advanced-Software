const mongoose = require("mongoose");
const joi = require('joi');

// project  Schema
const Finshedshema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

//Project  Model 
const Finishedpro = mongoose.model("Finishedpro", Finshedshema);

// validate Creat Project method
function validateCreatFinish(obj) {
    const schema = joi.object({
        // بحدد الخصائص لكل عنصر        
        title: joi.string().trim().min(3).max(250).required(), // trim :مسح للفراغات باول وآخر السترنج , required : بعطينا ياها المستخدم
        category: joi.string().trim().min(3).required(),
        description: joi.string().trim().min(3).required(),
    });

    return schema.validate(obj); //  req.body باخد البيانات من  , error : اسم الاوبجكت
}

// validate Update Project method
function validateUpdateFinish(obj) {
    const schema = joi.object({
        // بحدد الخصائص لكل عنصر        
        title: joi.string().trim().min(3).max(250), // trim :مسح للفراغات باول وآخر السترنج , required : بعطينا ياها المستخدم
        category: joi.string().trim().min(3),
        description: joi.string().trim().min(3),
    });

    return schema.validate(obj); //  req.body باخد البيانات من  , error : اسم الاوبجكت
}

module.exports = {
    Finishedpro,
    validateCreatFinish,
    validateUpdateFinish
};
