import getShardKey from "./get-shard-key.js";
import getTimeStamp from "./get-timestamp.js";
import stringifyObject from "./process-attributes.js";

const processUser = (user) => {
  if (!user.userId) {
    return new Error("A 'userId' must be provided");
  }

  return JSON.stringify({
    StreamName: "loaf-user-kinesis-stream",
    PartitionKey: getShardKey(),
    Data: Buffer.from(
      JSON.stringify({
        user_id: user.userId,
        user_attributes: stringifyObject(user.userAttributes) || null,
        user_created: getTimeStamp(),
      }),
    ).toString("base64"),
  });
};

export default processUser;
