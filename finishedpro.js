const express = require("express");
const router = express.Router();
const asyncHandler= require("express-async-handler"); 
const {validateCreatProject,validateUpdateProject,Project}= require("../models/Project");
const {validateCreatSkill,Skill}= require("../models/Skill");
const {validateCreatUser,validateLoginUser,validateUpdateUser,User}= require("../models/User");
const {validateCreatPlan,Plan}= require("../models/Plan");
const {validateCreatFinish,validateUpdateFinish,Finishedpro}= require("../models/Finishedpro");



router.post("/",asyncHandler(async(req,res) =>{

    // method joi.object  عملت اوبجكت داخل  
    // بدي اعمل validation
console.log(req.body);
    const {error} = validateCreatFinish(req.body);
if(error){
 return res.status(400).json({message: error.details[0].message}); // 400:  المشكلة من الكلينت مش السيرفر
                                                            
       }// اذا كلشي valid حيرجع null  ,ويكمل الكود طبيعي 

       
       
 const finish = new Finishedpro (
            // client هدول البيانات نحتاجها من 
     {
        title:req.body.title,
        description : req.body.description,
        category : req.body.category

    }  );
    const result = await finish.save();
    res.status(201).json(result); 

   
    
}));


router.get("/",asyncHandler(async(req,res)=>{
    const finish = await Finishedpro.find().populate(); 
    res.status(200).json(finish);
}));


/**
 * @desc Get  plan by id
 * @route /api/plans/:id
 * @method Get
 * @access public
 */

router.get("/:id",asyncHandler(async(req,res)=>{ //  : id   id daynamic

    const finish = await Finishedpro.findById(req.params.id).populate(); //  parseInt حول النص الى عدد  يلي هو الايدي يلي بياخدها من الريكويست
    if (finish) {
        res.status(200).json(finish); // اذا الكتاب موجود في الاري , 200: نجح  , ويرسله الكتاب 
    }
    else{
        res.status(404).json({ message:"project not found"});
    }
})) ;



/**
 * @desc update plan
 * @route /api/plans/:id
 * @method PUT
 * @access public
 * */
 
// PUT:(id بيعمل ابديت على اوبجكت معين (نحتاج  
router.put("/:id",asyncHandler(async(req,res)=>{ 
    // لازم نعمل فاليديشن على البيانات رح تيجي من الكلينت
    const {error}= validateUpdateFinish(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message}); // برجع المسج يلي رح ياخدها من الايرور

    }
    
    const updatedFinsh = await Finishedpro.findByIdAndUpdate(req.params.id ,{
        $set: {
            
            title:req.body.title,
            description : req.body.description,
            category : req.body.category,

        }
    } , {new: true }); //عشان يعطي للكلينت الابديت بوك
 
    res.status(200).json(updatedFinsh);
})); 


/**
 * @desc Delete a plan
 * @route /api/pro/:id
 * @method DELETE
 * @access public
 */
// delete:(id بيعمل حذف على اوبجكت المطلوب حذفه (نحتاج  
router.delete("/:id",asyncHandler(async(req,res)=>{ 
   
   
    // 
    const finish= await Finishedpro.findByIdAndDelete(req.params.id) ;
    
    if(finish){
    res.status(200).json({ message:"project has been deleted"});
}
else{
    res.status(404).json({ message:"project not found"});
}
}));

module.exports= router;