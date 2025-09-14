interface MenuItemType{
    name:string,
    url:string,
    icon:string,
    children?:MenuItemType[]
}

export  type {MenuItemType}