import getShardKey from "./get-shard-key.js";
import getTimeStamp from "./get-timestamp.js";
import stringifyObject from "./process-attributes.js";

const processEvent = (event) => {
  if (!event.eventName || !event.userId) {
    return new Error(
      "An 'eventName', and 'userId' must be provided must be provided",
    );
  }

  return JSON.stringify({
    StreamName: "loaf-event-kinesis-stream",
    PartitionKey: getShardKey(),
    Data: Buffer.from(
      JSON.stringify({
        event_name: event.eventName,
        user_id: event.userId || "default_user",
        event_attributes: stringifyObject(event.eventAttributes) || null,
        event_created: getTimeStamp(),
      }),
    ).toString("base64"),
  });
};

export default processEvent;
