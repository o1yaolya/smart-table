import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                                                        // @todo: создать и вернуть тег опции
                    const option = document.createElement('option');  // Создаём новый элемент <option>
                     // Устанавливаем value равным name
                    option.value = name;
                    
                    // Устанавливаем текстовое содержимое равным name
                    option.textContent = name;
                    
                    // Возвращаем созданный элемент
                    return option;
                      }))
})

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
          
        if (action === 'clear') {
            const parentElement = button.parentNode;
            const inputField = parentElement.querySelector('input');
            const fieldName = button.getAttribute('data-field');

            // Очищаем значение input
            inputField.value = '';

            // Обновляем состояние
            setState({
                ...state,
                [fieldName]: ''
            });
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
// Фильтрация данных с помощью компаратора
        if (action === 'filter') {
            const comparator = createComparison(defaultRules);
            const filteredData = comparator.compare(data, state);
            return filteredData;
        }
       return data.filter(row => compare(row, state));
    };
}