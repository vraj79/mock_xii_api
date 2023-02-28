const express = require("express");
const ProductModel = require("./productModel");

const ProductRouter=express.Router();

ProductRouter.post("/",async(req,res)=>{
    try {
        let product=new ProductModel(req.body);
        await product.save();
        res.status(201).send({status:"success",product});
    } catch (error) {
        console.log(error);
        res.status(501).send("Please try again")
    }
})

ProductRouter.get("/",async(req,res)=>{
    const {category,name,postedAt,page=1}=req.query
    console.log(postedAt)

    try {
        if(category){
            let products=await ProductModel.find({category:category}).skip((page-1)*4).limit(4);
            res.status(200).send(products);
        }else if(name){
            let products=await ProductModel.find({name:{ $regex: name ,$options:"i"}}).skip((page-1)*4).limit(4);
            res.status(200).send(products);
        }else if(postedAt){
            console.log(postedAt)
            if(postedAt==="asc"){
                let products=await ProductModel.find().skip((page-1)*4).limit(4).sort({postedAt:1});
                res.status(200).send(products);
            }else{
                let products=await ProductModel.find().skip((page-1)*4).limit(4).sort({postedAt:-1});
                res.status(200).send(products);
            }
        }else{
            let products=await ProductModel.find().skip((page-1)*4).limit(4);
            res.status(200).send(products);
        }
    } catch (error) {
        console.log(error);
        res.status(501).send("Please try again")
    }
})

ProductRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let product=await ProductModel.findByIdAndDelete(id);
        product ? res.send("Product Deleted") : res.send("Product Not Found");
    } catch (error) {
        console.log(error);
        res.status(501).send("Something Went Wrong");
    }
})

module.exports = ProductRouter