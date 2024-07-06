import styled from "styled-components";
import media from "styled-media-query";

const LayoutContainer = styled.div`
  
  transition: width 200ms ease-in-out;
  ${media.lessThan("medium")`
    width: 80vw;
  `}
  
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
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 border-radius: 1em;
//background-color: #3a5e6b;

padding: 1em;
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
//background-color: #3a5e6b;
background-color: #ffffff25;
padding: 1em;
`;

const LogOutButtonWrapper = styled.div`
    margin-top: 1em;
    display: flex;
    width: 100%;
    justify-content: center;    
`;

const LogOutButton = styled.button`
    font-weight: 700;
    width: 5em;
    background-color: #ee6464;
    color: #ffffff;
    border: none;
    border-radius: 1em;
    padding: 0.5em;
    transition: box-shadow 200ms ease-in-out;
    &:focus{
        outline: none;
    }
    &:hover{
        box-shadow: 7px 6px 20px #0000009e;
    }
`;

const UserProfile = ({name, bio, img, onClose, setUser}) => {


  const LogOut = (e) => {
    fetch(import.meta.env.VITE_BASE_URL + "/catwork/logout", {
      method: "GET",
      credentials: 'include'
    });
  setUser(null)
  onClose();
  }

    return (
    <LayoutContainer>
        <NameOptions>
          <h2>
            {name}
          </h2>
          <LogOutButtonWrapper>
            <LogOutButton onClick={(e) => LogOut(e)}>Log out</LogOutButton>
          </LogOutButtonWrapper>
        </NameOptions>
        <ProfileImage src={img}/>
        <Description>
            {bio}
        </Description>
    </LayoutContainer>
    );
  };
  
  export default UserProfile;