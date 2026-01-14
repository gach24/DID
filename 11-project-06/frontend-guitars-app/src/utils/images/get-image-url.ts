export const getImageUrl = (image: string) => {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return `/img/${image}.jpg`;
};
