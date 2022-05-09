import { FC } from 'react';
import styles from './scalable-image.module.css';

interface IScalableImage {
    src: string;
    alt: string;
}

const ScalableImage: FC<IScalableImage> = ({src, alt}) => {
    return <img className={styles.image} alt={alt} src={src} />
};

export default ScalableImage