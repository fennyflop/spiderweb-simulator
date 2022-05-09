import { CSSProperties, FC, useEffect, useMemo, useRef } from 'react';
import { useDrag } from 'react-dnd';
import styles from './application.module.css';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface IApplication {
    top: number;
    left: number;
    name: string;
    index: number;
    width: number | string;
    height: number | string;
    isOpen: boolean;
    isZoomed: boolean;
    applicationName: string;
    children: React.ReactNode;

    zoom: (name: string) => void;
    close: (name: string) => void;

    style?: CSSProperties;
}

const Application: FC<IApplication> = ({name, index, top, left, isOpen, zoom, close, children, width, height, applicationName, isZoomed, style}) => {
    const applicationRef = useRef<any>(null);


    const [{ isDragging }, dragRef, preview] = useDrag(
        () => ({
          type: 'app',
          item: () =>  {
              return { name, left, style, top, data: {width: applicationRef.current.offsetWidth, height: applicationRef.current.offsetHeight, isOpen}, applicationName, type: "app"}; 
          },
          collect: (monitor: { isDragging: () => any; }) => ({
            isDragging: monitor.isDragging(),
          }),
        }),
        [name, left, top, isOpen],
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false })
    }, []);

    const applicationStyle = useMemo<any>(() => {
        return isZoomed ? {
            width: "100%",
            height: "100vh",
            left: 0,
            top: 0,
            borderRadius: 0,
        }
        : { left, top, width, height }
    }, [isZoomed, left, top, width, height])

    if (isDragging || !isOpen) return null;

    return (
        <section className={styles.application} style={{...applicationStyle, zIndex: index}} ref={applicationRef}>
            <div className={styles.toolbar} draggable={!isZoomed} ref={dragRef}>
                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.close}`} onClick={() => close(name)}></button>
                    <button className={`${styles.button} ${styles.hide}`} onClick={() => close(name)}></button>
                    <button className={`${styles.button} ${styles.zoom}`} onClick={() => zoom(name)}></button>
                </div>
                <p className={styles.name}>{applicationName}</p>
            </div>
            {/* @ts-ignore */}
            <section className={styles.body} style={style}>
                {children}
            </section>
        </section>
    );
}

export default Application;