import bcrypt from "bcrypt";
const SALT_HASH_PASS = 8;
export default class User {
    id="";
    email="";
    password="";
    createdAt=null;
    updateAt=null;
    active = false;

    constructor({ id="", email="", password="", createdAt=null, active=false } = {}) {
        this.id = id;
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

    static mappingUserDBToUser(obj) {
        let user = new User();
        user.id = obj.key || obj?._id?.toString() || "";
        user.createdAt = obj.createdAt || null;
        user.updateAt = obj.updateAt || null;
        user.email = obj.email || "";
        user.password = obj.password || "";
        user.active = obj.active || false;
        return user;
    }
}
