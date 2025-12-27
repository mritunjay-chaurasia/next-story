import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param password Plain text password.
 * @returns Hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a password with a hashed password.
 * @param password Plain text password.
 * @param hashedPassword Hashed password from DB.
 * @returns True if the password matches.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
