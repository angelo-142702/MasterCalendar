export const validatorSchema = (schema) => (req,res,next) => {
    try{
        schema.parse(req.body);
        next();
    }catch(err){
        console.log(err.errors);
    return res.status(400).json({ error:err.errors.map(error => error.message) })        
    }
}

