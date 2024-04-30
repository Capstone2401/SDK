const getShardKey = require("./get-shard-key.js");
const getTimeStamp = require("./get-timestamp.js");

const processUser = (user) => {
  if (!user.userId) {
    return new Error("A userId' must be provided must be provided");
  }

  return JSON.stringify({
    StreamName: "loaf-user-kinesis-stream",
    PartitionKey: getShardKey(),
    Data: Buffer.from(
      JSON.stringify({
        user_id: user.userId,
        user_attributes: user.userAttributes || null,
        user_created: getTimeStamp(),
      }),
    ).toString("base64"),
  });
};

module.exports = processUser;
