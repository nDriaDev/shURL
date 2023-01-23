export default class URLRecord {
    constructor(url='') {
        this.originalUrl = url;
        this.shortUrl = '';
        this.clicked = 0;
        this.created = null;
        this.updateAt = null;
        this.urlCode = '';
        this.qrCode = '';
    }
}