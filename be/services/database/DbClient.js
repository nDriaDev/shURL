export default class DbClient {
    constructor(client) {
        this.client = client;
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async connect() {
        await this.client.connect();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async disconnect() {
        await this.client.disconnect();
    }

    /**
     *
     * @param {string} code
     * @returns {Promise<boolean>}
     */
    async hasCode(code) {
        return await this.client.hasCode(code);
    }

    /**
     *
     * @param {URLRecord} url
     * @returns {Promise<void>}
     */
    async createUrl(url) {
        await this.client.createUrl(url);
    }

    /**
     *
     * @param {URLRecord} url
     * @returns {Promise<URLRecord | null>}
     */
    async findUrl(url) {
        return await this.client.findUrl(url);
    }

    /**
     *
     * @param {URLRecord} url
     * @returns {Promise<void>}
     */
    async updateUrl(url) {
        await this.client.updateUrl(url);
    }

    /**
     *
     * @param {URLTempRecord} url
     * @param expireIn
     * @returns {Promise<void>}
     */
    async createTempUrl(url, expireIn) {
        await this.client.createTempUrl(url, expireIn);
    }

    /**
     *
     * @param {URLTempRecord} url
     * @returns {Promise<URLTempRecord | null>}
     */
    async findTempUrl(url) {
        return await this.client.findTempUrl(url);
    }

    /**
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    async createTempUser({ email, password }) {
        await this.client.createTempUser({ email, password });
    }

    /**
     *
     * @param {User} user
     * @returns {Promise<void>}
     */
    async createUser(user) {
        await this.client.createUser(user);
    }

    /**
     *
     * @param {string} id
     * @param {string} email
     * @param {string} password
     * @param {boolean} active
     * @returns {Promise<*>}
     */
    async findUser({ id, email, password, active }) {
        return await this.client.findUser({ id, email, password, active });
    }

    /**
     *
     * @param {User} user
     * @returns {Promise<*>}
     */
    async updateUser(user) {
        await this.client.updateUser(user);
    }

    /**
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<*>}
     */
    async updatePwdUser({email, password}) {
        await this.client.updatePwdUser({email, password});
    }
}
