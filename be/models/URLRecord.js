export default class URLRecord {
    id="";
    originalUrl="";
    shortUrl="";
    clicked=0;
    createdAt=null;
    updateAt=null;
    urlCode="";
    qrCode="";
    users = [];

    constructor({id = '', url = '', urlCode = '', userId = null}={}) {
        this.id = id;
        this.originalUrl = url;
        this.shortUrl = '';
        this.urlCode = urlCode;
        userId !== null && this.users.push(userId);
    }

    addUser(userId) {
        this.users.push(userId);
    }

    static mappingURLDBToURLRecord(obj) {
        let url = new URLRecord();
        url.id = obj.key || obj?._id?.toString() || "";
        url.qrCode = obj.qrCode || "";
        url.shortUrl = obj.shortUrl || "";
        url.originalUrl = obj.originalUrl || "";
        url.urlCode = obj.urlCode || "";
        url.users = obj.users || [];
        url.clicked = obj.clicked || 0;
        url.createdAt = obj.createdAt || null;
        url.updateAt = obj.updateAt || null;
        return url;
    }
}