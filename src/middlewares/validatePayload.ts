import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

const validatePayload = (schema: ObjectSchema, type: keyof Request) : RequestHandler => {
    return (req : Request, res : Response, next : NextFunction) => {
        const data = req[type];
        const { error } = schema.validate(data, {  abortEarly: false })
        if(error){
            res.status(422).json({ error: error.details.map(err => err.message ), success: false })
            return;
        }
        next();
    }
}

export default validatePayload;