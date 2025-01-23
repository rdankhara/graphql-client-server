import React from "react";

export interface HeaderProps {
    title: string;
    classes?: string;
}
export const Header = ({title, classes}: HeaderProps) => {
    return (<div className={`bg-gray-100 ${classes}`}>{title}</div>)
}

