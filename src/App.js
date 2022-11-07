import React, { useEffect, useState } from 'react';
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';
import axios from 'axios';

import listSvg from './assets/img/list.svg';
import addSvg from './assets/img/add.svg';

import style from './App.module.scss';

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3004/lists?_expand=color&_embed=tasks")
            .then((response) => {
                setLists(response.data);
            });
        axios.get("http://localhost:3004/colors")
            .then((response) => {
                setColors(response.data);
            });
    }, []);

    const onAddList = (obj) => {
        const newList = [...lists, obj];
        setLists(newList);
    }

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map((item) => {
            if(item.id === listId){
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setLists(newList);
    }

    const removeItem = (id) => {
        const newLists = lists.filter(item => item.id !== id);
        setLists(newLists);
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map((item) => {
            if(item.id === id){
                item.name = title;
            }
            return item; 
        });
        setLists(newList);
    }

    return (
        <div className={style.todo}>
            <div className={style.todo__sidebar}>
                <List items={[
                    {
                        icon: listSvg,
                        name: 'Все задачи',
                        active: true
                    }
                ]} />
                {lists
                    ? <List
                        items={lists}
                        isRemovable={true}
                        onRemove={(id) => removeItem(id)}
                        onClickItem={item => setActiveItem(item)}
                        activeItem={activeItem}
                    />
                    : ('Загрузка...')
                }
                <AddList addSvg={addSvg} colors={colors} onAddList={onAddList} />
            </div>
            <div className={style.todo__tasks}>
                {lists && activeItem && <Tasks list={activeItem} onEditTitle={onEditListTitle} onAddTask={onAddTask} />}
            </div>
        </div>
    );
}

export default App;
