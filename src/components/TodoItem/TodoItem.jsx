import React from 'react';
import styled, { css } from "styled-components";
import {TodoItemContainer} from './TodoItemContainer';
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {TodoItemDelete} from './TodoItemDelete';
import { TodoItemPriority } from './TodoItemPriority';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
    word-break: break-word;
  `;
})

export const TodoItem = ({id, title, checked, priority}) => {
  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} id={id} priority={priority}/>
      <Title checked={checked}>
        {title}
      </Title>
      <TodoItemPriority checked={checked} id={id} priority={priority}/>
      <TodoItemDelete deleteTodoItemId={id} title={title}/>
    </TodoItemContainer>
  )
}
