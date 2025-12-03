export const mapGuitarResponseToGuitar = (guitar: GuitarDBResponse): Guitar => ({
  id: guitar._id,
  name: guitar.name,
  image: guitar.image,
  description: guitar.description,
  price: guitar.price,
});