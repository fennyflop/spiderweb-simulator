import { TextFileArticle, TextFileHeading, TextFileImage, TextFileText, TextFileTitle } from '../../components/text-file/text-file';

const Roadmap = () => {
    return (
        <>
            <TextFileTitle>roadmap v1</TextFileTitle>
            <TextFileText>A unique collection of 10,000 spiders who build on web3 using $COBWEBs.</TextFileText>
            <TextFileArticle>
                <TextFileHeading>$COBWEB <TextFileImage src="/cobweb.webp" alt="cobweb icon" width="30" height="30" /></TextFileHeading>
                <TextFileText>$COBWEB is a token you can spend on our platform named spiderweb where users can build and host nft collections, create raffles/auctions, place bounties and do much more in the future. Get $COBWEB from staking SOLSpiders or by buy it from various p2p platforms.</TextFileText>
            </TextFileArticle>

        </>
    );
};

export default Roadmap;