import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export const TaskForm = ({ onAdd }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(value);
    setValue('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={!value.trim()}>
        Añadir
      </button>
    </form>
  );
};
