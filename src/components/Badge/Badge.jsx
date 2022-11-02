import React from "react";
import './Badge.scss';

const Badge = ({ color, onClick, className }) => {
    return (
        <i className={`badge badge--${color} ${className}`} onClick={onClick}></i>
    )
}

export default Badge;