import React from 'react';
import styled from "styled-components";
import { useDeleteTodoItem } from '../../data/hooks/useData';

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItemDelete = ({ deleteTodoItemId , title }) => {
  const {mutate} = useDeleteTodoItem();  
  const onClickDelete = () => {
    const isDeleteConfirm = window.confirm(`Удалить элемент ${title}?`);
    if (isDeleteConfirm) {
        mutate({ deleteTodoItemId });
    }
  }
  return <Delete onClick={onClickDelete}/>
}