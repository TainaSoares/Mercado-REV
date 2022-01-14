import { Request, Response } from "express"
import { connection } from "../connection"

const billOfSale = async(
    req:Request,
    res:Response
    ):Promise<void> => {
    try {

        const {name} = req.params //nome do cliente
    
        //Validando se o nome inserido é igual ao nome do banco de dados

        const [existingClient] = await connection("rev16_clientes")
            .where({name}) 

        if(!existingClient){
            throw new Error("Cliente não cadastrado!")
        }
        
        //ACESSANDO NOTA FISCAL
        const [result] = await connection.raw(`
        SELECT P.name, P.price FROM rev16_produtos as P
        JOIN rev16_nota as NF ON P.id = NF.id_produto
        JOIN rev16_clientes as C ON C.id = NF.id_cliente
        WHERE C.name = "${existingClient.name}";
        `);

        if(!result){
            throw new Error("Nenhuma compra efetuada")
        }
    

        res.status(201).send(result)


    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})    
    }

}

export default billOfSale