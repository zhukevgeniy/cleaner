class MTProtoAPIService {
  constructor(client) {
    this.client = client;
  }

  /**
   * @param {string} method
   * @param {Record<string, *>} params
   * @param {Object} [options={}]
   * */
  async call(method, params, options = {}) {
    try {
      return this.client.call(method, params, options);
    } catch (error) {
      console.error(`${method} error:`, error);

      const { error_code, error_message } = error;

      if (error_code === 303) {
        const [type, dcId] = error_message.split("_MIGRATE_");

        // If auth.sendCode call on incorrect DC need change default DC, because call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === "PHONE") {
          await this.client.setDefaultDc(+dcId);
        } else {
          options = {
            ...options,
            dcId: +dcId,
          };
        }

        return this.call(method, params, options);
      }

      return error;
    }
  }
}

module.exports = { MTProtoAPIService };
