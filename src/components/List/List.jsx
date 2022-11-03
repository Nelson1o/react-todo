import React from "react";
import Badge from "../Badge/Badge";
import './List.scss';
import removeSvg from '../../assets/img/remove.svg'

const List = ({ items, isRemovable, onClick, onRemove }) => {
    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')){
            onRemove(item);
        }
    }

    return (
        <ul className="list" onClick={onClick}>
            {items.map((item, index) => {
                return (
                    <li key={index} className={item.active ? "active" : null}>
                        <i>{item.icon
                            ? <img src={item.icon} alt='List Icon' />
                            : <Badge color={item.color} />
                        }</i>
                        <span className={item.folder ? "folder" : null}>{item.name}</span>
                        {isRemovable &&
                            <img
                                src={removeSvg}
                                alt="Remove icon"
                                className="list__remove-icon"
                                onClick={() => removeList(item)}
                            />}
                    </li>
                )
            })}
        </ul>
    )
}

export default List;