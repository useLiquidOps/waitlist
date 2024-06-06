import { Paragraph, SectionTitle, Title } from "./Text";
import Wrapper from "./Wrapper";
import Spacer from "./Spacer";
import { styled } from "@linaria/react"
import Card from "./Card"

export default function Berlin() {
  return (
    <Wrapper>
      <div>
        <Title>
          Find us
        </Title>
        <Spacer y={0.4} />
        <Paragraph>
          We're in Berlin for Arweave Day!
        </Paragraph>
      </div>
      <Profile>
        <Photo src="/lorimer.jpeg" alt="Lorimer" draggable={false} />
        <ProfileCard>
          <SectionTitle>
            Lorimer
          </SectionTitle>
          <Spacer y={.85} />
          <Paragraph>
            <b>Age:</b>{" "}20 (soon 21!!!)<br />
            <b>Height:</b>{" "}2 m+ (6'5")<br />
            <b>Hair:</b>{" "}7/10 (but he's working on it)<br />
            <br />
            Lorimer loves cheese and he's the tall guy from the two of us. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempore accusantium, quos adipisci amet ducimus, sequi consectetur natus earum mollitia dicta optio delectus excepturi quibusdam perspiciatis quasi. Blanditiis, non et!
          </Paragraph>
        </ProfileCard>
      </Profile>
      <RightProfile>
        <ProfileCard>
          <SectionTitle>
            Marton
          </SectionTitle>
          <Spacer y={.85} />
          <Paragraph>
            <b>Age:</b>{" "}21<br />
            <b>Height:</b>{" "}1.78 m (5'8", but let's not talk about it)<br />
            <b>Beard:</b>{" "}10/10<br />
            <br />
            Marton is the founder of the popular <a href="https://arconnect.io" target="_blank" rel="noopener noreferrer">ArConnect wallet</a>. He also contributed to and worked on numerous Arweave projects within the <a href="https://communitylabs.com" target="_blank" rel="noopener noreferrer">Community Labs</a> team, such as <a href="https://bark.arweave.dev" target="_blank" rel="noopener noreferrer">Bark</a>, <a href="https://github.com/permaweb/aos" target="_blank" rel="noopener noreferrer">aos</a> and more.
          </Paragraph>
        </ProfileCard>
        <Photo src="/marton.jpeg" alt="Marton" draggable={false} />
      </RightProfile>
      <Spacer y={.01} />
      <PhotoDump>
        <MainPhoto src="/main.jpeg" alt="Lorimer & Marton in Virginia" draggable={false} />
        <LeftPhoto src="/empirestate.jpeg" alt="Lorimer & Marton at the top of the Empire State building" draggable={false} />
        <RightPhoto src="/london.jpeg" alt="Lorimer & Marton in London" draggable={false} />        
      </PhotoDump>
      <Spacer y={2} />
    </Wrapper>
  );
}

const Profile = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  margin-right: auto;
  padding: 0 10vw;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Photo = styled.img`
  width: 12rem;
  height: 17rem;
  user-select: none;
  object-fit: cover;
  border-radius: 2rem;
`;

const RightProfile = styled(Profile)`
  margin-right: unset;
  margin-left: auto;

  @media screen and (max-width: 720px) {
    flex-direction: column-reverse;

    ${Photo} {
      margin-left: auto;
    }
  }
`;

const ProfileCard = styled(Card)`
  padding: 2rem;

  ${SectionTitle}, ${Paragraph} {
    text-align: left;

    b {
      color: #000;
    }

    @media screen and (max-width: 1250px) {
      width: 100%;
    }

    @media screen and (max-width: 720px) {
      width: 100%;
    }
  }

  ${Paragraph} {
    text-align: justify;
  }

  @media screen and (max-width: 720px) {
    width: calc(100% - 4rem);
  }
`;

const PhotoDump = styled.div`
  position: relative;
`;

const MainPhoto = styled.img`
  user-select: none;
  width: 100%;
  border-radius: 2rem;
  z-index: 1;
`;

const LeftPhoto = styled(MainPhoto)`
  position: absolute;
  left: -20%;
  top: 32%;
  width: 46%;
  z-index: 3;

  @media screen and (max-width: 720px) {
    top: 50%;
    width: 38%;
    left: -10%;
  }
`;

const RightPhoto = styled(MainPhoto)`
  position: absolute;
  top: 10%;
  right: -20%;
  width: 40%;
  z-index: 2;

  @media screen and (max-width: 720px) {
    right: -11%;
    top: -10%;
  }
`;
