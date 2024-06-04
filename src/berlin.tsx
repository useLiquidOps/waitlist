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
            Lorimer loves cheese and he's the tall guy from the two of us. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempore accusantium, quos adipisci amet ducimus, sequi consectetur natus earum mollitia dicta optio delectus excepturi quibusdam perspiciatis quasi. Blanditiis, non et!
          </Paragraph>
        </ProfileCard>
        <Photo src="/marton.jpeg" alt="Marton" draggable={false} />
      </RightProfile>
    </Wrapper>
  );
}

const Profile = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  width: max-content;
  margin-right: auto;
  padding: 0 10vw;
`;

const RightProfile = styled(Profile)`
  margin-right: unset;
  margin-left: auto;
`;

const Photo = styled.img`
  width: 12rem;
  height: 17rem;
  user-select: none;
  object-fit: cover;
  border-radius: 2rem;
`;

const ProfileCard = styled(Card)`
  padding: 2rem;

  ${SectionTitle}, ${Paragraph} {
    text-align: left;

    b {
      color: #000;
    }
  }

  ${Paragraph} {
    text-align: justify;
  }
`;
