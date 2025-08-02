<template>
  <v-container>
    <v-row>
      <!-- Чистый Vuetify компонент -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start color="primary">mdi-check-circle</v-icon>
            Чистый Vuetify
          </v-card-title>
          <v-card-text>
            <p>Этот компонент использует только Vuetify без дополнительных стилей.</p>
            <v-btn color="primary" class="mt-3">
              Стандартная кнопка
            </v-btn>
            <v-alert type="info" class="mt-3">
              Стандартное уведомление
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Гибридный компонент -->
      <v-col cols="12" md="6">
        <v-card class="shadow-2xl hover:shadow-3xl transition-all duration-300">
          <v-card-title class="text-2xl font-bold text-gray-800">
            <v-icon start color="primary">mdi-palette</v-icon>
            Vuetify + Tailwind
          </v-card-title>
          <v-card-text>
            <p class="text-gray-600 mb-4">Этот компонент сочетает Vuetify с Tailwind CSS.</p>
            
            <!-- Vuetify кнопка с Tailwind анимацией -->
            <v-btn 
              color="success" 
              class="transform hover:scale-105 transition-transform duration-200"
            >
              Анимированная кнопка
            </v-btn>

            <!-- Кастомный блок с Tailwind -->
            <div class="mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <h3 class="text-white font-bold text-shadow">Кастомный градиентный блок</h3>
              <p class="text-blue-100 mt-2">Создан с помощью Tailwind CSS</p>
            </div>

            <!-- Vuetify список с Tailwind стилями -->
            <v-list class="mt-4 bg-gray-50 rounded-lg">
              <v-list-item class="hover:bg-gray-100 transition-colors">
                <template v-slot:prepend>
                  <v-icon color="success">mdi-check</v-icon>
                </template>
                <v-list-item-title class="font-semibold">Гибридный подход</v-list-item-title>
              </v-list-item>
              <v-list-item class="hover:bg-gray-100 transition-colors">
                <template v-slot:prepend>
                  <v-icon color="info">mdi-lightbulb</v-icon>
                </template>
                <v-list-item-title class="font-semibold">Лучшее из двух миров</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Демонстрация кастомных компонентов -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-title>
            <v-icon start color="accent">mdi-tools</v-icon>
            Кастомные компоненты
          </v-card-title>
          <v-card-text>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Кастомная карточка -->
              <div class="custom-card">
                <h3 class="text-lg font-bold text-custom-blue mb-2">Кастомная карточка</h3>
                <p class="text-gray-600">Создана с помощью @layer components</p>
              </div>

              <!-- Кастомная кнопка -->
              <button class="custom-button custom-button-primary">
                Кастомная кнопка
              </button>

              <!-- Градиентный блок -->
              <div class="gradient-bg p-4 rounded-lg text-white">
                <h3 class="font-bold">Градиентный фон</h3>
                <p class="text-blue-100">Создан с помощью @layer utilities</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Интерактивные элементы -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Интерактивные элементы</v-card-title>
          <v-card-text>
            <div class="space-y-4">
              <!-- Vuetify слайдер с Tailwind стилями -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Настройка: {{ sliderValue }}
                </label>
                <v-slider
                  v-model="sliderValue"
                  :min="0"
                  :max="100"
                  class="custom-slider"
                ></v-slider>
              </div>

              <!-- Vuetify переключатель с Tailwind анимацией -->
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Темная тема</span>
                <v-switch
                  v-model="darkMode"
                  color="primary"
                  class="transform hover:scale-110 transition-transform"
                ></v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Анимации</v-card-title>
          <v-card-text>
            <div class="space-y-4">
              <!-- Анимированный элемент -->
              <div class="animate-bounce-slow bg-custom-green text-white p-4 rounded-lg text-center">
                <v-icon size="large">mdi-star</v-icon>
                <p class="mt-2 font-bold">Медленная анимация</p>
              </div>

              <!-- Пульсирующий элемент -->
              <div class="animate-pulse-slow bg-custom-red text-white p-4 rounded-lg text-center">
                <v-icon size="large">mdi-heart</v-icon>
                <p class="mt-2 font-bold">Пульсирующая анимация</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

// Реактивные данные
const sliderValue = ref(50);
const darkMode = ref(false);
</script>

<style scoped>
/* Кастомные стили для слайдера */
.custom-slider {
  @apply bg-gray-200 rounded-lg;
}

/* Дополнительные стили для демонстрации */
.custom-slider .v-slider__thumb {
  @apply shadow-lg;
}

.custom-slider .v-slider__track {
  @apply bg-blue-500;
}
</style> 