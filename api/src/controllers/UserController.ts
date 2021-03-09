import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepositiry = getRepository(User);

        const userAlreayExists = await usersRepositiry.findOne({
            email,
        });

        if (userAlreayExists) {
            return response.status(400).json({
                error: "User already exists!",
            });
        }

        const user = usersRepositiry.create({
            name,
            email,
        });

        await usersRepositiry.save(user);

        return response.json(user);
    }
}

export { UserController };