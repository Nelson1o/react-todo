import React, { useEffect } from "react";
import List from "../List/List";
import Badge from "../Badge/Badge";
import axios from 'axios';

import './AddList.scss';
import style from '../../App.module.scss';
import closeSvg from '../../assets/img/close.svg'

const AddList = ({ addSvg, colors, onAddList }) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(3);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisible(false);
        setInputValue('');
        setSelectedColor(colors[0].id);
    }

    const addObjInList = () => {
        if (!inputValue) {
            return alert('Enter list item name');
        }
        setIsLoading(true);
        axios.post("http://localhost:3004/lists", { name: inputValue, colorId: selectedColor })
            .then((response) => {
                const color = colors.filter(color => color.id === selectedColor)[0].name;
                const listObj = {...response.data, color: {name:color}};
                onAddList(listObj);
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisible(true)}
                items={[
                    {
                        icon: addSvg,
                        name: 'Добавить список',
                        folder: true
                    }
                ]} />
            {visible &&
                <div className="add-list__popup">
                    <img
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__popup-close-btn"
                        onClick={onClose}>
                    </img>
                    <input
                        className={style.field}
                        type="text"
                        placeholder="Название списка"
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value) }}
                    />
                    <div className="add-list__popup-colors">
                        {
                            colors.map((color) => {
                                return <Badge
                                    color={color.name}
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    className={selectedColor === color.id && 'active'}
                                />
                            })
                        }
                    </div>
                    <button className={style.button + " button__st"} onClick={addObjInList}>
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            }
        </div>
    )
}

export default AddList;