import { getFileExtension } from '../../utils/fileHelpers.js';
import { generateIndexHtml } from '../../generators/htmlGenerator.js';

export function getTodoTemplate(projectName, language) {
  const ext = getFileExtension(language);
  
  return {
    'public/index.html': generateIndexHtml(projectName),
    'public/manifest.json': JSON.stringify({
      "short_name": projectName,
      "name": projectName,
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff"
    }, null, 2),
    'public/robots.txt': 'User-agent: *\nAllow: /',
    [`src/index.${ext}`]: getIndexFile(),
    [`src/App.${ext}`]: getAppFile(language),
    [`src/components/TodoList.${ext}`]: getTodoListComponent(language),
    [`src/components/TodoItem.${ext}`]: getTodoItemComponent(language),
    [`src/components/AddTodo.${ext}`]: getAddTodoComponent(language),
    [`src/hooks/useTodos.${ext}`]: getUseTodosHook(language),
    [`src/pages/Home.${ext}`]: getHomePage(language),
  };
}

function getIndexFile() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
}

function getAppFile(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import Home from './pages/Home';

const App${ext} = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Home />
    </div>
  );
};

export default App;`;
}

function getTodoListComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList${ext} = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;`;
}

function getTodoItemComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ todo: Todo; onToggle: (id: string) => void; onDelete: (id: string) => void }>' : '';
  const types = language === 'TypeScript' ? `
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}` : '';

  return `import React from 'react';
${types}

const TodoItem${ext} = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 text-blue-600"
        />
        <span className={\`ml-3 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;`;
}

function getAddTodoComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ onAdd: (text: string) => void }>' : '';
  
  return `import React, { useState } from 'react';

const AddTodo${ext} = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodo;`;
}

function getUseTodosHook(language) {
  const ext = language === 'TypeScript' ? ': Todo[]' : '';
  const types = language === 'TypeScript' ? `
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}` : '';

  return `import { useState, useEffect } from 'react';
${types}

export function useTodos() {
  const [todos${ext}, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text${language === 'TypeScript' ? ': string' : ''}) => {
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text,
        completed: false
      }
    ]);
  };

  const toggleTodo = (id${language === 'TypeScript' ? ': string' : ''}) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id${language === 'TypeScript' ? ': string' : ''}) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}`;
}

function getHomePage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import TodoList from '../components/TodoList';

const Home${ext} = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <TodoList />
    </div>
  );
};

export default Home;`;
} 