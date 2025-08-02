<template>
  <v-card>
    <v-card-title>
      <v-icon start color="primary">mdi-format-list-checks</v-icon>
      Todo List с Composition API
    </v-card-title>
    
    <v-card-text>
      <!-- Форма добавления -->
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="Добавить задачу..."
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            block
            color="primary"
            @click="addTodo"
            prepend-icon="mdi-plus"
            :disabled="!newTodo.trim()"
          >
            Добавить
          </v-btn>
        </v-col>
      </v-row>

      <!-- Список задач -->
      <v-list v-if="todos.length > 0" class="mt-4">
        <v-list-item
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ 'text-decoration-line-through': todo.completed }"
        >
          <template v-slot:prepend>
            <v-checkbox
              v-model="todo.completed"
              color="success"
              hide-details
            ></v-checkbox>
          </template>
          
          <v-list-item-title
            :class="{ 'text-decoration-line-through': todo.completed }"
          >
            {{ todo.text }}
          </v-list-item-title>
          
          <template v-slot:append>
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              size="small"
              @click="removeTodo(todo.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <!-- Пустое состояние -->
      <v-alert
        v-else
        type="info"
        variant="tonal"
        class="mt-4"
        text="Нет задач. Добавьте первую!"
      ></v-alert>

      <!-- Фильтры -->
      <v-card-actions class="mt-4">
        <v-btn-group>
          <v-btn
            :color="filter === 'all' ? 'primary' : 'default'"
            :variant="filter === 'all' ? 'elevated' : 'outlined'"
            @click="updateFilter('all')"
            size="small"
          >
            Все ({{ todos.length }})
          </v-btn>
          <v-btn
            :color="filter === 'active' ? 'primary' : 'default'"
            :variant="filter === 'active' ? 'elevated' : 'outlined'"
            @click="updateFilter('active')"
            size="small"
          >
            Активные ({{ activeTodosCount }})
          </v-btn>
          <v-btn
            :color="filter === 'completed' ? 'primary' : 'default'"
            :variant="filter === 'completed' ? 'elevated' : 'outlined'"
            @click="updateFilter('completed')"
            size="small"
          >
            Завершенные ({{ completedTodosCount }})
          </v-btn>
        </v-btn-group>
      </v-card-actions>

      <!-- Прогресс -->
      <div v-if="todos.length > 0" class="mt-4">
        <v-progress-linear
          :model-value="progressPercentage"
          color="success"
          height="20"
          rounded
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.round(value) }}%</strong>
          </template>
        </v-progress-linear>
        <div class="text-caption text-center mt-1">
          Прогресс выполнения
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLocalStorage } from '../composables/useLocalStorage.js';

// Используем composable для localStorage
const { value: todos, setValue: setTodos } = useLocalStorage('todos', []);
const { value: filter, setValue: setFilter } = useLocalStorage('todoFilter', 'all');

// Реактивные данные
const newTodo = ref('');

// Генератор ID
let nextId = 1;

// Инициализируем nextId на основе существующих todos
if (todos.value.length > 0) {
  nextId = Math.max(...todos.value.map(todo => todo.id)) + 1;
}

// Вычисляемые свойства
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed);
    case 'completed':
      return todos.value.filter(todo => todo.completed);
    default:
      return todos.value;
  }
});

const activeTodosCount = computed(() => 
  todos.value.filter(todo => !todo.completed).length
);

const completedTodosCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
);

const progressPercentage = computed(() => {
  if (todos.value.length === 0) return 0;
  return (completedTodosCount.value / todos.value.length) * 100;
});

// Методы
const addTodo = () => {
  const text = newTodo.value.trim();
  if (text) {
    const newTodos = [...todos.value, {
      id: nextId++,
      text: text,
      completed: false,
      createdAt: new Date()
    }];
    setTodos(newTodos);
    newTodo.value = '';
  }
};

const removeTodo = (id) => {
  const newTodos = todos.value.filter(todo => todo.id !== id);
  setTodos(newTodos);
};

const updateFilter = (newFilter) => {
  setFilter(newFilter);
};
</script>

 