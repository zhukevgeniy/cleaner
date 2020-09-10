const { MTProtoClient } = require("./client");
const { MTProtoAPIService } = require("./api");
const { TelegramService } = require("./TelegramService");
const { askPhoneCode } = require("./ask-phone-code");

const phone = "+375295671034";
const password = "H56zeFKvdfQ";

(async function main() {
  const mtprotoAPIService = new MTProtoAPIService(MTProtoClient);
  const telegramService = new TelegramService(mtprotoAPIService);

  try {
    const { phone_code_hash } = await telegramService.sendCode(phone);
    const code = await askPhoneCode();
    const res = await telegramService.signIn({ code, phone, phone_code_hash });

    console.log({ res });
  } catch (error) {
    console.error({ error });

    /*console.error({ error });

    if (error.error_message === "SESSION_PASSWORD_NEEDED") {
      return getPassword().then(async (result) => {
        const { srp_id, current_algo, srp_B } = result;
        const { g, p, salt1, salt2 } = current_algo;

        const { A, M1 } = await getSRPParams({
          g,
          p,
          salt1,
          salt2,
          gB: srp_B,
          password,
        });

        return checkPassword({ srp_id, A, M1 });
      });
    }*/
  }
})();
