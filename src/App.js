import React from 'react';
import List from './components/List/List';
import AddList from './components/AddList/AddList';

import DB from './assets/db.json';

import listSvg from './assets/img/list.svg';
import addSvg from './assets/img/add.svg';

import style from './App.module.scss';

function App() {
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
                <List items={[
                    {
                        color: "green",
                        name: 'Покупки'
                    },
                    {
                        color: "blue",
                        name: 'Фронтенд',
                        active: true
                    },
                    {
                        color: "pink",
                        name: 'Фильмы и сериалы'
                    }
                ]}
                    isRemovable={true}
                />
                <AddList addSvg={addSvg} colors={DB.colors} />
            </div>
            <div className={style.todo__tasks}>

            </div>
        </div>
    );
}

export default App;
