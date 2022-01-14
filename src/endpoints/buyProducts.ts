import { Request, Response } from "express"
import { connection } from "../connection"

const buyProducts = async(
    req:Request,
    res:Response
    ):Promise<void> => {
    try {

        const {name} = req.params
        const {id} = req.body //id do produto

        if(!id){
            throw new Error("Insira um parâmetro válido")
        }

        //Validando se o nome inserido é igual ao nome do banco de dados

        const [existingClient] = await connection("rev16_clientes")
            .where({name}) 

        if(!existingClient){
            throw new Error("Cliente não cadastrado!")
        }
        
        //Produto escolhido
        const [product] = await connection("rev16_produtos")
            .where({id})
    


        await connection
        .insert({
            id: Date.now().toString(),
            id_cliente: existingClient.id,
            id_produto: id
        })
        .into("rev16_nota")

        res.status(201).send({message: `${product.name} adicionado na nota fiscal`})


    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})    
    }

}

export default buyProducts