import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onRemove }: Props) => {
  return (
    <li className={`task-item${task.done ? ' done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button
        type="button"
        className="btn-remove"
        aria-label="Eliminar tarea"
        onClick={() => onRemove(task.id)}
      >
        ✕
      </button>
    </li>
  );
};
