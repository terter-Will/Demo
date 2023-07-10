<template>
  <div class="todo-container tropical-theme">
    <h1 class="todo-heading">To-Do List</h1>

    <div class="flex-container">
      <div class="table-container">
        <table class="todo-table completed-todos">
          <caption class="table-caption">Completed</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, index) in completedTodos" :key="todo.id" :class="{ 'todo-item': true, 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }">
              <td>{{ todo.id }}</td>
              <td>{{ todo.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-container">
        <table class="todo-table uncompleted-todos">
          <caption class="table-caption">Uncompleted</caption>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, index) in uncompletedTodos" :key="todo.id" :class="{ 'todo-item': true, 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }">
              <td>
                <input type="checkbox" v-model="selectedTodos" :value="todo.id" class="todo-checkbox">
              </td>
              <td>{{ todo.id }}</td>
              <td>{{ todo.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-container">
        <table class="todo-table in-progress-todos">
          <caption class="table-caption">In Progress</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="inProgressTodos.length > 0">
              <tr v-for="(todo, index) in inProgressTodos" :key="todo.id" class="todo-item in-progress-row">
                <td>{{ todo.id }}</td>
                <td>{{ todo.title }}</td>
                <td>
                  <button @click="completeTodo(todo.id)" class="complete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#008000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M22 4l-10 10-5-5"></path>
                    </svg>
                  </button>
                </td>
                <td>
                  <button @click="moveToUncompleted(todo.id)" class="trash-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e64980" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M17 6l1.5 14H5.5L7 6"></path>
                      <path d="M2 6h20"></path>
                      <path d="M12 11v6"></path>
                      <path d="M9 11v6"></path>
                      <path d="M15 11v6"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="4" class="no-data-row">You have nothing need to do!! Stay sharping.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      selectedTodos: []
    };
  },
  computed: {
    uncompletedTodos() {
      return this.todos.filter(todo => !todo.completed && !this.selectedTodos.includes(todo.id));
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed);
    },
    inProgressTodos() {
      return this.todos.filter(todo => this.selectedTodos.includes(todo.id));
    }
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    completeTodo(todoId) {
      const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
      if (todoIndex > -1) {
        this.todos[todoIndex].completed = true;
        this.selectedTodos = this.selectedTodos.filter(id => id !== todoId);
      }
    },
    moveToUncompleted(todoId) {
      const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
      if (todoIndex > -1) {
        this.todos[todoIndex].completed = false;
        this.selectedTodos = this.selectedTodos.filter(id => id !== todoId);
      }
    }
  }
};
</script>

<style>
.todo-container {
  width: 100%;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.todo-heading {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
}

.section-heading {
  font-size: 20px;
  margin-bottom: 8px;
  color: #555;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.table-container {
  flex: 1;
  margin-right: 16px;
}

.todo-table {
  border-collapse: collapse;
}

.todo-table caption {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.todo-table th,
.todo-table td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.todo-table th {
  background-color: #f2f2f2;
  color: #555;
}

.todo-item.odd-row {
  background-color: #fdfdfd;
}

.todo-item.even-row {
  background-color: #f6f6f6;
}

.tropical-theme {
  background-color: #ffe6b3;
}

.todo-checkbox {
  margin: 0;
}

.trash-button {
  border: none;
  background: none;
  color: #e64980;
  cursor: pointer;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.feather polyline,
.feather path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.complete-button {
  border: none;
  background: none;
  color: #00cc00;
  cursor: pointer;
}

.no-data-row {
  text-align: center;
  padding: 8px;
  color: #888;
}
</style>
