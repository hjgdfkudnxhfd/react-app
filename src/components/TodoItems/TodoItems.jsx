import React, {useEffect, useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortedItems, setSortedItems] = useState(null);

  const {data: todoItems, isLoading} = useData();

  useEffect(() => {
    if (sortedItems) {
        const filteredBySearchItems = todoItems.filter((todoItem) => {
          const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
          const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
          return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 3;
        });
        setSortedItems(filteredBySearchItems.sort((a, b) => a.priority - b.priority));
    }
  }, [todoItems]);

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
  
    // const clearedTodoItemTitle = очистка от пробелов + приведение к одному из регистров
    // const clearedSearchValue = очистка от пробелов + приведение к одному из регистров
    // const isSearched = проверка вхождения строки поиска в строку заголовка
    // return isSearched

    //return true; // удалить после реализации фильтрации

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
    const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 3;
  });

  const onClickHandler = () => {
    setSortedItems(filteredBySearchItems.sort((a, b) => a.priority - b.priority));
  };

  const todoItemsElements = sortedItems ? sortedItems.map((item, index) => {
    return <TodoItem
          key={item.id}
          title={item.title}
          checked={item.isDone}
          id={item.id}
          priority={item.priority} />;
    }) : filteredBySearchItems.map((item, index) => {
      return <TodoItem
          key={item.id}
          title={item.title}
          checked={item.isDone}
          id={item.id}
          priority={item.priority} />;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} setSortedItems={setSortedItems} />
      <button onClick={onClickHandler}>Сортировка</button>
        {todoItemsElements}
        <NewTodoItem />
    </TodoItemsContainer>
  )
}