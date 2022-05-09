import Image from 'next/image';
import { FC, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styles from './icon.module.css';

interface IIcon {
    type: 'icon';
    name: string;

    top: number;
    left: number;
    image: string;
    filename: string;

    open: (name: string) => void;
}

const Icon: FC<IIcon> = ({name, type, image, filename, top, left, open}) => {
  if (!name || !type || !image || !filename) return null; 
    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: 'icon',
        item: { name, left, top, filename, image, type: "icon" },
        collect: (monitor: { isDragging: () => any; }) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [name, filename, left, top],
    )

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    if (isDragging) return <div ref={drag} />

    return (
        <div className={styles.icon} ref={drag} style={{top, left}} onClick={() => open(name)}>
            <Image width="76" height="76" src={image} alt={name + ' icon'} />
            <p className={styles.filename}>{filename}</p>
        </div>
    )
}

export default Icon;