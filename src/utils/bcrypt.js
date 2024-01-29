import bcrypt from 'bcrypt';

async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(userPassword, hashPassword) {
    try {
        const result = await bcrypt.compare(userPassword, hashPassword);
        return result;
    } catch (error) {
        throw error;
    }
}

export { hashPassword, comparePassword };