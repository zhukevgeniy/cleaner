const { MTProto } = require("@mtproto/core");
const { tempLocalStorage } = require("@mtproto/core/src/storage/temp");

const MTProtoClient = new MTProto({
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,
  customLocalStorage: tempLocalStorage,
});

module.exports = { MTProtoClient };
