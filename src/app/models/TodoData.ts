export interface DocumentTasks {
  todoList: ListTasks[]
}

export interface ListTasks {
  todos: Task[]
}

export interface Task {
  name: string | undefined;
  color: string;
  colors?: string[];
  dates?: string[];
}
