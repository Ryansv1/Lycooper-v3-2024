import fastify, { FastifyInstance } from "fastify";
import { prismaConnection } from "../lib/prisma";
import { date, z } from "zod";
import { newDate } from "../services/convert-date-to-string";


export async function apiRoutes(app: FastifyInstance){
    app.get("/collect", async (req, res) =>{
        const requestSchema = z.object({
            date: z.string(),
            sensorId: z.string()
        })
        const { date, sensorId } = requestSchema.parse(req.query);
        try {
            const data = await prismaConnection.sensorData.findMany({
                where:{
                    sensorId: sensorId,
                    createdAt: date
                }
            })
            return res.status(200).send({data})
        } catch(error){
            return res.status(500).send({error: "Erro ao buscar dados"})
        }
    })

    app.post("/input", async (req, res) =>{
        
        const requestSchema = z.object({
            sensorId: z.string(),
            value: z.number().int()
        })
        const { sensorId, value } = requestSchema.parse(req.body);
        try {
            const newData = await prismaConnection.sensorData.create({
                data :{
                    sensorId: sensorId,
                    sensorData: value,
                    createdAt: newDate()
                }
            })
        } catch (error) {
            return res.status(500).send({error: "Erro ao inserir dados"})
        }
    })
}