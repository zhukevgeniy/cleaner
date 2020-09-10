class TelegramService {
  constructor(api) {
    this.api = api;
  }

  /**
   * @param {string} phone
   * */
  async sendCode(phone) {
    const params = {
      phone_number: phone,
      api_id: process.env.API_ID,
      api_hash: process.env.API_HASH,
      settings: {
        _: "codeSettings",
      },
    };

    try {
      const sendCodeResponse = await this.api.call("auth.sendCode", params);

      return sendCodeResponse;
    } catch (error) {
      throw new Error(`Unable to receive code: ${error.error_message}`);
    }
  }

  /**
   * @param {number} code
   * @param {string} phone
   * @param {string} phone_code_hash
   * */
  async signIn({ code, phone, phone_code_hash }) {
    const params = {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phone_code_hash,
    };

    try {
      const signInResponse = await this.api.call("auth.signIn", params);

      return signInResponse;
    } catch (error) {
      throw new Error(`Unable to sign in: ${error.error_message}`);
    }
  }

  async getPassword() {
    try {
      return await this.api.call("account.getPassword");
    } catch (error) {
      throw new Error(`Unable to get password: ${error.error_message}`);
    }
  }

  async checkPassword({ srp_id, A, M1 }) {
    const params = {
      password: {
        _: "inputCheckPasswordSRP",
        srp_id,
        A,
        M1,
      },
    };

    try {
      return await this.api.call("auth.checkPassword", params);
    } catch (error) {
      throw new Error(`Unable to check password: ${error.error_message}`);
    }
  }
}

module.exports = { TelegramService };
