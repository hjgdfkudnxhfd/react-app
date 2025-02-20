import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import {SortButton} from './components/SortButtons';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortMethod, setSortMethod] = useState('');

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = todoItem.title.trim().toLowerCase();
    const clearedSearchValue = searchValue.trim().toLowerCase();
    const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1 || clearedSearchValue.length < 3;
    return isSearched;
  })

  const sortedElements = () =>{
    if(sortMethod === 'asc'){
      return filteredBySearchItems.sort((item1, item2) => item1.priority - item2.priority);
    } else if(sortMethod === 'desc'){
      return filteredBySearchItems.sort((item1, item2) => item2.priority - item1.priority);
    } else {
      return filteredBySearchItems;
    }
  };

  const todoItemsElements = sortedElements().map((item, index) => {
    return <TodoItem key={item.id} title={item.title} checked={item.isDone} id={item.id} priority={item.priority} />;
  });

  return (
    <TodoItemsContainer>
      
      <div><SearchInput value={searchValue} setValue={setSearchValue}/>
        <SortButton src={'assets/images/png/min-max-sort.png'} alt="Сортировка по возрастанию" onClick={() => setSortMethod('asc')} />
        <SortButton src={'assets/images/png/max-min-sort.png'} alt="Сортировка по убыванию" onClick={() => setSortMethod('desc')} />
        <SortButton src={'assets/images/png/reset.png'} alt="Без сортировки" onClick={() => setSortMethod('')} />
      </div>
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}