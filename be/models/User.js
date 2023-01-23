import bcrypt from "bcrypt";
const SALT_HASH_PASS = 8;
export default class User {
    email;
    password;
    createdAt;
    updateAt;
    active;

    constructor({ email="", password="", createdAt=null, active=false } = {}) {
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.active = active;
    }

    set updateAt(updateAt) {
        this.updateAt = updateAt;
    }

    static hashPassword(pwd) {
        return bcrypt.hashSync(pwd,SALT_HASH_PASS);
    }

    static async comparePassword(currentPwd, hashedPwd) {
        return await bcrypt.compare(currentPwd, hashedPwd);
    }
}
