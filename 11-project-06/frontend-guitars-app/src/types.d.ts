
interface Guitar {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};      

interface CartItem extends Guitar {
  quantity: number;
}

type GuitarId = Lookup<Guitar, 'id'>;

interface GuitarDBResponse {
  _id:         string;
  name:        string;
  image:       string;
  description: string;
  price:       number;
  __v:         number;
}