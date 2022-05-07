import Image from 'next/image';
import { FC } from 'react';
import styles from './text-file.module.css';

interface ITextFileChildren {
    className?: string;
    children: React.ReactNode;
}

const TextFileTitle: FC<ITextFileChildren> = ({children, className}) => {
    return <h2 className={`${styles.title} ${className}`}>{children}</h2>;
}

const TextFileText: FC<ITextFileChildren> = ({children, className}) => {
    return <p className={`${styles.text} ${className}`}>{children}</p>
}

const TextFileArticle: FC<ITextFileChildren> = ({children, className}) => {
    return <article className={`${styles.article} ${className}`}>{children}</article>
}

const TextFileHeading: FC<ITextFileChildren> = ({children, className}) => {
    return <h3 className={`${styles.heading} ${className}`}>{children}</h3>;
}

interface ITextFileImage {
    src: string;
    alt: string;
    width: string;
    height: string;

    className?: string;
}

const TextFileImage: FC<ITextFileImage> = ({src, alt, width, height, className}) => {
    console.log(src);
    return src[0] === '/' ?
    <Image src={src} alt={alt} width={width} height={height} className={className} />
    :
    <img src={src} alt={alt} style={{width, height}} className={className} />
}

export {TextFileTitle, TextFileText, TextFileArticle, TextFileHeading, TextFileImage};