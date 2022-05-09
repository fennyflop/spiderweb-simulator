import { FC, useCallback, useEffect, useState } from 'react';
import { IFolderItems } from '../../utils/misc';
import styles from './folder.module.css';

interface IFolder {
    update: any;
    field: string;
    items: any;
}

const Folder: FC<IFolder> = ({field, items, update}) => {

    const setItem = (updatedItem: string) => {
        update('folder', 'children', <Folder items={items} update={update} field={updatedItem} />);
    }

    console.log(items[field]?.children);

    return (
        <>
            <ul className={styles.list}>
                {
                    Object.keys(items).map((key: any, i) => {
                        const {name} = items[key];
return <li className={`${styles.element} ${items[field] === items[key] && styles.selected}`} key={i} onClick={() => setItem(key)}>{name}</li>
                    })
                }
            </ul>
            <div className={styles.container}>
                {items[field]?.children}
                {!items[field] && <p>no file selected</p>}
            </div>
        </>
    )
}

export default Folder;