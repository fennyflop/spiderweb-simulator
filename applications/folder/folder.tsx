import { FC, useCallback, useState } from 'react';
import { IFolderItems, TFolderItem } from '../../utils/misc';
import styles from './folder.module.css';

interface IFolder {
    // items: IFolderItems;
    // fetchSelectedItem: () => TFolderItem;
    // setSelectedItem: (item: TFolderItem) => void;

    items: IFolderItems;
}

const Folder: FC<IFolder> = ({items}) => {

    const [item, setItem] = useState<TFolderItem>({name: '', image: ''});

    return (
        <>
            <ul className={styles.list}>
                {
                    Object.keys(items).map((key: any, i) => {
                        const {name} = items[key];
return <li className={`${styles.element} ${item === items[key] && styles.selected}`} key={i} onClick={() => setItem(items[key])}>{name}</li>
                    })
                }
            </ul>
            <div className={styles.container}>
                {item?.image ? <img className={styles.image} alt={item?.name} src={item.image} /> : <p>no image selected</p>}
            </div>
        </>
    )
}

export default Folder;