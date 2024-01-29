import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const UploadToFirebase = async (path, file) => {
    const imageRef = ref(
        storage,
        `images/${path}/${
          file.name + Date.now() + Math.round(Math.random() * 1000)
        }`
      );

      const snapshot = await uploadBytes(imageRef, file);
      return await getDownloadURL(snapshot.ref);
      
}