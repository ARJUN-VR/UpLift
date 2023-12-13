import express, { Request,Response } from "express"

export const userController=()=>{
    const loadPage=(req:Request,res:Response)=>{
        res.send("<h1>hey its working...have a great start...</h1>")
    }
    const addUser=async(req:Request,res:Response)=>{
        const {name,email,password} = req.body
    }
    return {
        loadPage
    }
}