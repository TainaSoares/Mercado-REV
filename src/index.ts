import { Request, Response } from "express"
import app from "./app"
import buyProducts from "./endpoints/buyProducts"
import createClient from "./endpoints/createClient"
import billOfSale from "./endpoints/getBillOfSale"

//teste
app.get("/", (req:Request, res:Response) =>{
    res.send("hello world")
})

//Endpoints de criar cliente, realizar compra, busca por cliente

app.post("/cliente", createClient)
app.post("/cliente/:name", buyProducts)
app.get("/nota-fiscal/:name", billOfSale)