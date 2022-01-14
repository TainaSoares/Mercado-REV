import { Request, Response } from "express"
import { connection } from "../connection"

const createClient = async(
    req:Request,
    res:Response
    ):Promise<void> => {
    try {

        const {name} = req.body

        if(!name){
            throw new Error("Insira um nome válido")
        }

        //Validando se o nome inserido é igual ao nome do banco de dados

        const existingClient = await connection("rev16_clientes")
            .where({name}) 


        if(existingClient[0]){
            throw new Error("Cliente já cadastrado!")
        }

        

        await connection
        .insert({
            id: Date.now().toString(),
            name
        })
        .into("rev16_clientes")

        res.status(201).send({message: "Cliente criado com sucesso!"})


    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})    
    }

}

export default createClient