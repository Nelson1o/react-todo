import React from "react";
import Badge from "../Badge/Badge";
import './List.scss';

const List = ({ items, isRemovable, onClick }) => {
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
                        {isRemovable}
                    </li>
                )
            })}
        </ul>
    )
}

export default List;