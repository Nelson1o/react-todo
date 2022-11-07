import React, { useState } from 'react';
import addSvg from '../../assets/img/add.svg';
import style from '../../App.module.scss';
import './Tasks.scss';
import axios from 'axios';

const AddTaskForm = ({ list, onAddTask }) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios.post("http://localhost:3004/tasks", obj)
            .then(({ data }) => {
                onAddTask(list.id, obj);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="tasks__form">
            {!visibleForm
                ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>
                : <div className="tasks__form-block">
                    <input
                        className={style.field}
                        type="text"
                        placeholder="Текст задачи"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button
                        disabled={isLoading}
                        className={style.button + " button__st"}
                        onClick={addTask}>
                        {isLoading ? "Добавление..." : "Добавить задачу"}
                    </button>
                    <button
                        className={style.button + " button__st button--grey"}
                        onClick={toggleFormVisible}>
                        Отмена
                    </button>
                </div>
            }
        </div>
    )
}

export default AddTaskForm;