import * as sdk from "node-appwrite";
import { conf } from "./conf";

const client = new sdk.Client();
client
  .setEndpoint(conf.appwriteEndpoint)
  .setProject(conf.appwriteProjectId)
  .setKey(conf.appwriteApiKey);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
