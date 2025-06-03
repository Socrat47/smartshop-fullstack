import bcyrpt from 'bcryptjs'

const hashedPassword = async (password: string): Promise<string> => {
    const hashedPass = await bcyrpt.hash(password, 10);
    return hashedPass;
}

export default hashedPassword;