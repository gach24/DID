import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createGuitar } from '../../api/actions';

interface FormData {
  name: string;
  image: FileList;
  description: string;
  price: string;
}

export const CreateGuitarPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur'
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const file = data.image[0];
      const fileName = file ? file.name.replace(/\.[^/.]+$/, '') : '';

      const newGuitar = await createGuitar({
        name: data.name,
        image: fileName,
        description: data.description,
        price: Number(data.price)
      });
      
      navigate(`/${newGuitar.id}`);
    } catch (error) {
      console.error('Error al crear la guitarra:', error);
      alert('Error al crear la guitarra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      setSelectedFileName(fileName);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <main className="container-xl mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Crear Nueva Guitarra</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                {...register('name', {
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres'
                  }
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen</label>
              <input
                type="file"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                id="image"
                accept="image/*"
                {...register('image', {
                  required: 'La imagen es requerida',
                  onChange: handleImageChange
                })}
              />
              {selectedFileName && (
                <small className="text-muted">Archivo seleccionado: {selectedFileName}</small>
              )}
              {errors.image && (
                <div className="invalid-feedback">{errors.image.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                id="description"
                rows={4}
                {...register('description', {
                  required: 'La descripción es requerida',
                  minLength: {
                    value: 10,
                    message: 'La descripción debe tener al menos 10 caracteres'
                  }
                })}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Precio</label>
              <input
                type="number"
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                id="price"
                min="0"
                step="0.01"
                {...register('price', {
                  required: 'El precio es requerido',
                  min: {
                    value: 0,
                    message: 'El precio debe ser mayor o igual a 0'
                  },
                  valueAsNumber: false
                })}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price.message}</div>
              )}
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-dark py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Creando...' : 'Crear Guitarra'}
              </button>
              
              <button
                type="button"
                className="btn btn-outline-dark py-3"
                onClick={() => navigate('/')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

