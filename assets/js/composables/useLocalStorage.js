import { ref, watch } from 'vue';

/**
 * Composable для работы с localStorage
 * @param {string} key - ключ для localStorage
 * @param {any} defaultValue - значение по умолчанию
 * @returns {object} - реактивная переменная и методы для работы с localStorage
 */
export function useLocalStorage(key, defaultValue = null) {
  // Получаем значение из localStorage или используем значение по умолчанию
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;
  
  // Создаем реактивную переменную
  const value = ref(initialValue);
  
  // Функция для сохранения значения
  const setValue = (newValue) => {
    value.value = newValue;
  };
  
  // Функция для удаления значения
  const removeValue = () => {
    value.value = defaultValue;
    localStorage.removeItem(key);
  };
  
  // Следим за изменениями и сохраняем в localStorage
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  }, { deep: true });
  
  return {
    value,
    setValue,
    removeValue
  };
} 