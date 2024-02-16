import fastify, { FastifyInstance } from "fastify";
import { prismaConnection } from "../lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";
import { checkIfUserExists } from "../services/check-if-user-exists";

export async function registerRoute(app: FastifyInstance){
    app.post("/register", async (req, res) =>{
        const userSchema = z.object({
            userName: z.string(),
            userPassword: z.string().min(8),
            userEmail: z.string().email(),
        })
        const { userName, userPassword, userEmail } = userSchema.parse(req.body);

        try {
            const existingUser = await prismaConnection.users.findUnique({
                where: {
                    email: userEmail
                }
            })
            if(existingUser){
                return res.status(400).send({
                    error: "User already exists"
                })
            }
            const hashedPassword = await hash(userPassword, 10);

            const newUser = await prismaConnection.users.create({
                data: {
                    name: userName,
                    email: userEmail,
                    password: hashedPassword,
                }
            });

            newUser.password = " ";
            return res.status(200).send({
                message: "User created successfully",
                data: newUser
            })
         } catch (error) {
            return res.status(500).send({
                error: "Something went wrong",
                log: error
            })
        }
    })
    app.post("/login", async (req, res) =>{
        const userSchema = z.object({
            userEmail: z.string().email(),
            userPassword: z.string().min(8),
        })
        const { userEmail, userPassword } = userSchema.parse(req.body);
        
        try {
            await checkIfUserExists(userEmail, userPassword).then((existingUser) =>{
                if (existingUser) {
                    return res.status(200).send({
                        message: "User logged in successfully",
                        data: existingUser
                    })
                } 
                return res.status(400).send({
                        error: "User not found"
                })
            });
        } catch(e){
            console.error(e)
        }
    })
}