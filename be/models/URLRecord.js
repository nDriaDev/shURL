export default class URLRecord {
    originalUrl="";
    shortUrl="";
    clicked=0;
    created=null;
    updateAt=null;
    urlCode="";
    qrCode="";
    users = [];

    constructor({url = '', urlCode = '', userId = null}={}) {
        this.originalUrl = url;
        this.shortUrl = '';
        this.urlCode = urlCode;
        userId !== null && this.users.push(userId);
    }

    addUser(userId) {
        this.users.push(userId);
    }
}