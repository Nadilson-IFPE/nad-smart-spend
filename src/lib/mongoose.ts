import mongoose from "mongoose";

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
        throw new Error('Variável de ambiente inválida ou não configurada: "NEXT_PUBLIC_MONGODB_URL"')
    }

    if (process.env.NEXT_PUBLIC_MONGODB_URL === '') {
        throw new Error('Variável de ambiente não configurada: "NEXT_PUBLIC_MONGODB_URL"')
    }

    return await mongoose
        .connect(process.env.NEXT_PUBLIC_MONGODB_URL as string)
        .catch((error) => console.log(error));
}