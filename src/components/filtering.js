//import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
//const compare = createComparison(defaultRules);

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        // @todo: #4.1 — заполнить выпадающие списки опциями
        Object.keys(indexes)                                    // Получаем ключи из объекта
            .forEach((elementName) => {                        // Перебираем по именам
                elements[elementName].append(                    // в каждый элемент добавляем опции
                    ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                        .map(name => {                        // используйте name как значение и текстовое содержимое
                            // @todo: создать и вернуть тег опции
                            const el = document.createElement('option');  // Создаём новый элемент <option>
                            // Устанавливаем value равным name
                            el.value = name;

                            // Устанавливаем текстовое содержимое равным name
                            el.textContent = name;

                            // Возвращаем созданный элемент
                            return el;
                        }))
            })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        if (action && action.name === 'clear') {
            const parentElement = action.parentNode;
            const inputField = parentElement.querySelector('input');
            const fieldName = action.getAttribute('data-field');

            // Очищаем значение input
            inputField.value = '';
            // Обновляем состояние
            state[fieldName] = '';
           
        }

        // @todo: #4.5 — отфильтровать данные, используя компаратор 

        const filter = {};

        Object.keys(elements).forEach(key => {

            if (elements[key]) {

                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными 

                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра 

                }

            }

        })


        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу 

    }

    return {

        updateIndexes,

        applyFiltering

    }

} 
