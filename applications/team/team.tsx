import { TextFileArticle, TextFileHeading, TextFileImage, TextFileText, TextFileTitle } from '../../components/text-file/text-file';
import styles from './team.module.css';

const Team = () => {
    return (
        <>
            <TextFileTitle>Team</TextFileTitle>
            <TextFileText>Meet the greatest:</TextFileText>
            <TextFileArticle>
                <TextFileHeading>fennyflop / alex</TextFileHeading>
                <TextFileImage width="150px" height="150px" alt="alex" src="https://www.lifepng.com/wp-content/uploads/2020/11/Doge-Facing-Right-png-hd.png" />
                <TextFileText>Founder, front-end engineer</TextFileText>
            </TextFileArticle>
        </>
    )
}

export default Team;