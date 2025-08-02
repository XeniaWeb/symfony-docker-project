import { ref, computed, watch } from 'vue';

/**
 * Composable для логики счетчика
 * @param {number} initialValue - начальное значение
 * @returns {object} - реактивные данные и методы для счетчика
 */
export function useCounter(initialValue = 0) {
  // Реактивные данные
  const count = ref(initialValue);
  const maxCount = ref(initialValue);
  const minCount = ref(initialValue);

  // Вычисляемые свойства
  const isPositive = computed(() => count.value > 0);
  const isNegative = computed(() => count.value < 0);
  const isZero = computed(() => count.value === 0);

  // Методы
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  const setValue = (value) => {
    count.value = value;
  };

  // Наблюдатель за изменениями count
  watch(count, (newValue) => {
    if (newValue > maxCount.value) {
      maxCount.value = newValue;
    }
    if (newValue < minCount.value) {
      minCount.value = newValue;
    }
  }, { immediate: true });

  return {
    // Реактивные данные
    count,
    maxCount,
    minCount,
    
    // Вычисляемые свойства
    isPositive,
    isNegative,
    isZero,
    
    // Методы
    increment,
    decrement,
    reset,
    setValue
  };
} 