import { prismaConnection } from "../lib/prisma";
import { hash, compare} from "bcrypt";

export async function checkIfUserExists(userEmail: string, userPassword: string){
        const existingUser = await prismaConnection.users.findUnique({
        where: {
            email: userEmail, 
        }
    })
    const databasePassword  = existingUser.password
    const isPasswordCorrect = await compare(userPassword, databasePassword)
    if (existingUser) {
        return existingUser;
    }
}