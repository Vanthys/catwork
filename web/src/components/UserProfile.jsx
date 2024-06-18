import styled from "styled-components";

const LayoutContainer = styled.div`
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.5fr 0.5fr; 
  grid-template-rows: 0.5fr 1.5fr;
  gap: 0px 0px; 
  grid-template-areas: 
    "name pic"
    "desc desc"; 
`;

const NameOptions = styled.div`
 grid-area: name;
`;


const ProfileImage = styled.img`
grid-area: pic;
border-radius: 50%;
width: 10em;
height: 10em;
object-fit: cover;
margin: 0.5em;
`;


const Description = styled.div`
grid-area: desc;
border-radius: 1em;
background-color: #3a5e6b;
`;

const UserProfile = ({name, bio, img}) => {
    return (
    <LayoutContainer>
        <NameOptions>
          {name}
        </NameOptions>
        <ProfileImage src={img}/>
        <Description>
            {bio}
        </Description>
    </LayoutContainer>
    );
  };
  
  export default UserProfile;