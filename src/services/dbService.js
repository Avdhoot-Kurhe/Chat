import { id, i, init } from '@instantdb/react';

const APP_ID = "b4509896-8b70-47b4-a0a7-d7168853dd14";

const schema = i.schema({
  entities: {
    users: i.entity({ name: i.string() }),
    id: i.string(),
    messages: i.entity({
      sender: i.string(),
      receiver: i.string(),
      text: i.string(),
      timestamp: i.number(),
    }),
  },
});

export const db = init({ appId: APP_ID, schema });
export { id };