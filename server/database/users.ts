import { prisma } from "./index";
import { type RegisterRequest } from "~/validation/authSchemas";
import { hashPassword } from "~/server/utils/Hash";

export const createUser = async (data: RegisterRequest) => {
    delete data.password_confirm;

    data.password = await hashPassword(data.password);

    return await prisma.user.create({
        data: {
            ...data,
            profile: "https://picsum.photos/200/200",
        },
    });
};

export const findUserByUsername = (equalsTo: string) => {
    return prisma.user.findFirst({
        where: {
            username: equalsTo,
        },
    });
};

export const isUserExists = async (username: string) => {
    const user = await findUserByUsername(username);
    return user !== null;
};

export const findUserByID = (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    })
}
