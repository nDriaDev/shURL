export default class DbClient {
    constructor(client) {
        this.client = client;
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.disconnect();
    }

    async findUrl(url) {
        return await this.client.findUrl(url);
    }

    async updateUrl(url) {
        await this.client.updateUrl(url);
    }

    async hasCode(code) {
        return await this.client.hasCode(code);
    }

    async createUrl(url) {
        await this.client.createUrl(url);
    }

    async createUser({ email, password }) {
        await this.client.createUser({ email, password });
    }

    async findUser({ id, email, password }) {
        return this.client.findUser({ id, email, password });
    }
}
