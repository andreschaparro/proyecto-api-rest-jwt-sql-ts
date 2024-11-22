import bcrypt from 'bcrypt';

// Número de iteraciones, a mayor número es mas seguro
const SALT_ROUNDS: number = 10;

// Para hashear el password recibido durante el register
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Para verificar el password recibido durante el login
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}