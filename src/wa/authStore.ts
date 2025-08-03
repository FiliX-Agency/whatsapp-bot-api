import {
  initAuthCreds,
  AuthenticationState,
  SignalDataTypeMap,
} from "@whiskeysockets/baileys";
import { WASession } from "../models/index.js";

async function authStore(userId: string): Promise<{
  state: AuthenticationState;
  saveCreds: () => Promise<void>;
}> {
  let dbSession = await WASession.findOne({ userId });

  let creds = dbSession ? dbSession.creds : initAuthCreds();
  let keys: Record<string, any> = dbSession ? dbSession.keys : {};

  const save = async () => {
    await WASession.updateOne(
      { userId },
      {
        creds,
        keys,
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
