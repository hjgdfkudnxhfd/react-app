import React from 'react';
import styled from "styled-components";
import {useUpdateTodoItem} from "../../data/hooks/useData";

const PriorityContainer = styled.span`
    font-size: 15px;
`;

export const PrioritySpan = styled.span(props => {
  return `
    cursor: pointer;
    color:
    ${props.color};
    ${props.checked ? 'text-decoration: line-through;' : ''};
  `;
});

export const TodoItemPriority = ({id, checked, priority}) => {
  const {mutate} = useUpdateTodoItem();

  const onClickSetPriority = (newPriority) => {
    console.log(checked);
    console.log(priority);
    mutate({updatedId: id, checked, priority: newPriority});
  }

  const setColor = (selected, checked) => {
    if(checked){
      return '#B5B5BA';
    }
    if(selected){
      return '#2c226e';
    } else {
      return '#FFFFFF';
    }
  };

  return(
    <PriorityContainer>
      <PrioritySpan color={setColor(1 === priority, checked)} checked={checked} onClick={() => onClickSetPriority(1)}>1</PrioritySpan>
      <PrioritySpan color={setColor(2 === priority, checked)} checked={checked} onClick={() => onClickSetPriority(2)}>2</PrioritySpan>
      <PrioritySpan color={setColor(3 === priority, checked)} checked={checked} onClick={() => onClickSetPriority(3)}>3</PrioritySpan>
    </PriorityContainer>
  )
}