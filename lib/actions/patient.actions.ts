"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { conf } from "../conf";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );

      file = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwritePatientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBucketId}/files/${file?.$id}/view?project=${conf.appwriteProjectId}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePatientCollectionId,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
