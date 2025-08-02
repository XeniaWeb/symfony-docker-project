<template>
  <v-card>
    <v-card-title>
      <v-icon start color="primary">mdi-counter</v-icon>
      Счетчик с Composition API
    </v-card-title>
    
    <v-card-text>
      <div class="text-center mb-4">
        <v-chip
          :color="count > 0 ? 'success' : count < 0 ? 'error' : 'default'"
          size="x-large"
          variant="outlined"
          class="text-h2 font-weight-bold"
        >
          {{ count }}
        </v-chip>
      </div>
      
      <v-row>
        <v-col cols="4">
          <v-btn
            block
            color="error"
            variant="elevated"
            @click="decrement"
            prepend-icon="mdi-minus"
          >
            Уменьшить
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            color="secondary"
            variant="outlined"
            @click="reset"
            prepend-icon="mdi-refresh"
          >
            Сброс
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            color="success"
            variant="elevated"
            @click="increment"
            prepend-icon="mdi-plus"
          >
            Увеличить
          </v-btn>
        </v-col>
      </v-row>
      
      <v-divider class="my-4"></v-divider>
      
      <v-row>
        <v-col cols="6">
          <v-card variant="outlined" color="success">
            <v-card-text class="text-center">
              <div class="text-h6">{{ maxCount }}</div>
              <div class="text-caption">Максимум</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card variant="outlined" color="error">
            <v-card-text class="text-center">
              <div class="text-h6">{{ minCount }}</div>
              <div class="text-caption">Минимум</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useCounter } from '../composables/useCounter.js';

// Используем composable для счетчика
const {
  count,
  maxCount,
  minCount,
  increment,
  decrement,
  reset
} = useCounter(0);
</script>

 