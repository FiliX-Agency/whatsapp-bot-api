import {
  initAuthCreds,
  AuthenticationState,
  SignalDataTypeMap,
  AuthenticationCreds,
  BufferJSON,
} from "@whiskeysockets/baileys";
import { WASession } from "../models/index.js";

async function authStore(userId: string): Promise<{
  state: AuthenticationState;
  saveCreds: () => Promise<void>;
}> {
  let dbSession = await WASession.findOne({ userId });

  let creds: AuthenticationCreds;
  let keys;

  if (!dbSession || !dbSession.creds || !dbSession.keys) {
    creds = initAuthCreds();
    keys = {};
  } else {
    creds = JSON.parse(dbSession.creds, BufferJSON.reviver);
    keys = JSON.parse(dbSession.keys, BufferJSON.reviver);
  }
  const save = async () => {
    await WASession.updateOne(
      { userId },
      {
        creds: JSON.stringify(creds, BufferJSON.replacer),
        keys: JSON.stringify(keys, BufferJSON.replacer),
        qr: {
          url: null,
          isUsed: true,
        },
      },
      { upsert: true }
    );
  };

  return {
    state: {
      creds,
      keys: {
        get: (type, ids) => {
          const data: any = {};
          for (const id of ids) {
            if (keys[type]?.[id]) {
              data[id] = keys[type][id];
            }
          }
          return data;
        },
        set: async (data) => {
          console.log("keys set ->", data);
          for (const category in data) {
            const key = category as keyof SignalDataTypeMap;

            if (!keys[key]) {
              keys[key] = {};
            }

            Object.assign(keys[key]!, data[key]!);
          }
          await save();
        },
      },
    },
    saveCreds: save,
  };
}

export { authStore };
