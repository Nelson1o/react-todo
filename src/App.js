import React from 'react';
import List from './components/List/List';
import AddList from './components/AddList/AddList';

import DB from './assets/db.json';

import listSvg from './assets/img/list.svg';
import addSvg from './assets/img/add.svg';

import style from './App.module.scss';
import Tasks from './components/Tasks/Tasks';

function App() {
    const [lists, setLists] = React.useState(DB.lists.map((item) => {
        item.color = DB.colors.filter((color) => color.id === item.colorId)[0].name;
        return item;
    }));

    const onAddList = (obj) => {
        const newList = [...lists, obj];
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
                <List items={lists} isRemovable={true} onRemove={(item) => console.log(item)} />
                <AddList addSvg={addSvg} colors={DB.colors} onAddList={onAddList}/>
            </div>
            <div className={style.todo__tasks}>
                <Tasks />
            </div>
        </div>
    );
}

export default App;
