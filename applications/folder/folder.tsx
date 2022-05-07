import { FC, useCallback, useState } from 'react';
import { IFolderItems, TFolderItem } from '../../utils/misc';
import styles from './folder.module.css';

interface IFolder {
    items: IFolderItems;
}

const Folder: FC<IFolder> = ({items}) => {
    const [selectedItem, setSelectedItem] = useState<TFolderItem>({name: '', image: ''});

    const select = useCallback((item: TFolderItem) => {
        // @ts-ignore
        setSelectedItem(item);
    }, [selectedItem, setSelectedItem]);

    return (
        <>
            <ul className={styles.list}>
                {
                    Object.keys(items).map((key, i) => {
                        const {name} = items[key];
                        return <li className={styles.element} key={i} onClick={() => select(items[key])}>{name}</li>
                    })
                }
            </ul>
            <div className={styles.container}>
                <img className={styles.image} alt={selectedItem?.name} src={selectedItem.image} />
            </div>

        </>
    )
}

export default Folder;