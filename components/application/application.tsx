import { FC, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import styles from './application.module.css';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface IApplication {
    top: number;
    left: number;
    name: string;
    width: number;
    height: number;
    isOpen: boolean;
    applicationName: string;
    children: React.ReactNode;

    close: (name: string) => void;
}

const Application: FC<IApplication> = ({name, top, left, isOpen, close, children, width, height, applicationName}) => {
    const applicationRef = useRef<any>(null);

    const [{ isDragging }, dragRef, preview] = useDrag(
        () => ({
          type: 'app',
          item: () =>  {
              console.log(applicationName, isOpen)
              return { name, left, top, data: {width: applicationRef.current.offsetWidth, height: applicationRef.current.offsetHeight, isOpen}, applicationName, type: "app" }; 
          },
          collect: (monitor: { isDragging: () => any; }) => ({
            isDragging: monitor.isDragging(),
          }),
        }),
        [name, left, top, isOpen],
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    if (isDragging || !isOpen) return null;

    return (
        <section className={styles.application} style={{left, top, width, height}} ref={applicationRef}>
            <div className={styles.toolbar} draggable ref={dragRef}>
                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.close}`} onClick={() => close(name)}></button>
                    <button className={`${styles.button} ${styles.hide}`}></button>
                    <button className={`${styles.button} ${styles.zoom}`}></button>
                </div>
                <p className={styles.name}>{applicationName}</p>
            </div>
            {children}
        </section>
    );
}

export default Application;