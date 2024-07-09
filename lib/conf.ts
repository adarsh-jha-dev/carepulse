export const conf = {
  appwriteApiKey: String(process.env.API_KEY),
  appwriteProjectId: String(process.env.PROJECT_ID),
  appwriteDatabaseId: String(process.env.DATABASE_ID),
  appwritePatientCollectionId: String(process.env.PATIENT_COLLECTION_ID),
  appwriteDoctorCollectionId: String(process.env.DOCTOR_COLLECTION_ID),
  appwriteAppointmentCollectionId: String(
    process.env.APPOINTMENT_COLLECTION_ID
  ),
  appwriteBucketId: String(process.env.NEXT_PUBLIC_BUCKET_ID),
  appwriteEndpoint: String(process.env.NEXT_PUBLIC_ENDPOINT),
};
