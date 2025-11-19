interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface CartItem extends Guitar {
  quantity: number;
}

type GuitarId = Lookup<Guitar, 'id'>;
