import styled from "styled-components"
import { useUpdateTodoItem } from "../../data/hooks/useData";
const Input = styled.select`
    font-size: 12px;
    width: 30px;
    height: 20px;
    border: solid 1px gray;
    border-radius: 20%;
    background-color:rgb(255, 255, 255);
`
export const PriorityInput = ({ id, checked, priority, setPriorityForNewTask, setColor }) => {
    const { mutate } = useUpdateTodoItem();
    const onChangeHandler  = (e) => {
        if (setPriorityForNewTask) {
            setPriorityForNewTask(e.target.value);
        }
        if (setColor) {
            setColor(e.target.value === '1' ? '#EF9A9A' : e.target.value === '2' ? '#EFC99A' : e.target.value === '3' ? '#ECEF9A' : '#A8EF9A');
        }
        mutate({ id, checked, priority: e.target.value });
    };
    return (
        <Input value={priority} onChange={onChangeHandler } >
            {[1, 2, 3, 4].map(num =>
                <option key={num} value={num}>
                    {num}
                </option>)}
        </Input>
    );
}