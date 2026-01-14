
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file: File) => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET');
  }
  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

 

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo subir la imagen');
  }


  const result = (await response.json()) as { secure_url?: string; url?: string };
  const imageUrl = result.secure_url ?? result.url;
  if (!imageUrl) {
    throw new Error('Cloudinary no devolvió una URL válida');
  }

  return imageUrl;
};