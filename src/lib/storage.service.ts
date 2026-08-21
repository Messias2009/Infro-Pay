import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadMetadata,
} from "firebase/storage";
import { storage, auth } from "@/lib/firebase-config";

export interface UploadOptions {
  folder?: string;
  filename?: string;
  customPath?: string;
  metadata?: UploadMetadata;
  onProgress?: (percent: number) => void;
}

export interface UploadResult {
  downloadUrl: string;
  fullPath: string;
  name: string;
  size: number;
  contentType?: string;
}

/**
 * Uploads a file to Firebase Storage.
 * Generates an authenticated user-scoped path by default:
 * `uploads/{userId}/{folder}/{timestamp}-{safeName}`
 */
export async function uploadFileToStorage(
  file: File | Blob,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const currentUser = auth.currentUser;
  const userId = currentUser?.uid || "public";
  const folder = options.folder || "media";

  let filePath = options.customPath;
  const fileName = options.filename || (file instanceof File ? file.name : `blob-${Date.now()}`);

  if (!filePath) {
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    filePath = `uploads/${userId}/${folder}/${timestamp}_${cleanFileName}`;
  }

  const storageRef = ref(storage, filePath);

  const meta: UploadMetadata = {
    contentType:
      options.metadata?.contentType ||
      (file instanceof File ? file.type : "application/octet-stream") ||
      "application/octet-stream",
    customMetadata: {
      uploadedBy: userId,
      originalName: fileName,
      ...options.metadata?.customMetadata,
    },
    ...options.metadata,
  };

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, meta);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 0 && options.onProgress) {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          options.onProgress(progress);
        }
      },
      (error) => {
        console.error("Firebase Storage upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          if (options.onProgress) {
            options.onProgress(100);
          }
          resolve({
            downloadUrl,
            fullPath: uploadTask.snapshot.ref.fullPath,
            name: fileName,
            size: file.size,
            contentType: meta.contentType,
          });
        } catch (err) {
          reject(err);
        }
      },
    );
  });
}

/**
 * Deletes a file from Firebase Storage given its path or download URL.
 */
export async function deleteFileFromStorage(pathOrUrl: string): Promise<boolean> {
  if (!pathOrUrl) return false;
  try {
    let fileRef;
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
      fileRef = ref(storage, pathOrUrl);
    } else {
      fileRef = ref(storage, pathOrUrl);
    }
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.warn("Storage deleteObject warning:", error);
    return false;
  }
}
