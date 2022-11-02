import React from "react";
import List from "../List/List";
import Badge from "../Badge/Badge";

import './AddList.scss';
import style from '../../App.module.scss';
import closeSvg from '../../assets/img/close.svg'


const AddList = ({ addSvg, colors }) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(colors[0].id);

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
                        onClick={() => setVisible(false)}>
                    </img>
                    <input className={style.field} type="text" placeholder="Название списка" />
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
                    <button className={style.button + " button__st"}>Добавить</button>
                </div>
            }
        </div>
    )
}

export default AddList;