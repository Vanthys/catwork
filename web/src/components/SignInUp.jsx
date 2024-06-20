import styled from "styled-components";
import { useState, useRef} from "react";
import UserIcon from '../assets/user.svg';
import media from "styled-media-query";

const LayoutContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 200ms ease-in-out;
  ${media.lessThan("medium")`
    width: 80vw;
  `}
  ${media.greaterThan("medium")`
    width: 400px;
  `}
`;

const ImageUploadWrapper = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

  /* default image */
  background: url('${props=> props.$image}');
  background-color: #ffffff54;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 7px 6px 20px #0000009e;
  margin-bottom: 1em;
`;

const ImageUploadInput = styled.input`
    opacity: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    position: absolute;
    top: 0%;
    left: 0%;
`;


const TextInput = styled.input`
    border: none;
    font-family: "Josefin Sans", sans-serif;
    font-size: 1em;
    color: black;
    border-bottom: 1px solid white;
    transition: border 200ms ease-in-out;
    padding: 5px;
    box-shadow: 7px 6px 20px #0000009e; 
    border-radius: 0.5em;
    margin-bottom: 1em;
    &:focus{
        outline: none;
    }
    
`;


const SubSwitch = styled.sub`
cursor: pointer;
text-decoration: underline;
font-weight: 300;
transition: font-weight 200ms ease-in-out;
&:focus{
    font-weight: 500;
}
&:hover{
    
   font-weight: 500;
}

`;


const ActionButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;    
    margin-bottom: 1em;
`;

const ActionButton = styled.input`
    font-weight: 700;
    width: 5em;
    background-color: white;
    color: black;
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

const SignInUp = () => {

    const [mode, setMode] = useState(true)


    const toggleMode = () => {
        setMode(!mode)
    }

    const [image, setImage] = useState(UserIcon);
    const ImageInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (!image.type.includes('image')) {
            return alert('Only images are allowed!');
        }

        if (image.size > 10_000_000) {
            return alert('Maximum upload size is 10MB!');
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
      
        fileReader.onload = (fileReaderEvent) => {
          
          setImage(fileReaderEvent.target.result)
         
        }

    }

    const signIn = () => {
      fetch("http://127.0.0.1:80/catwork/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",     
            "Content-Type": "application/json"        
          },
        body: {"user": "admin", "password": "password"}
  })
  .then(response => {
    console.log(response)
    if (response.status != 200) {
        console.error("Login Failed")
        return;
    }
    console.log(response.json())
    })
    ;

    } 

    return (
    <LayoutContainer>
        {mode && 
        <>
        <h2>Sign in</h2>
            <TextInput type="text" placeholder="username"/>
            <TextInput type="password" placeholder="password"/>
            <ActionButtonWrapper>
              <ActionButton onClick={(e) => signIn(e)} type="submit" value="Sign in"/>
            </ActionButtonWrapper>
        </>
        }
        {!mode &&
        <>
        <h2>Sign Up</h2>
        <ImageUploadWrapper $image={image}>
                <ImageUploadInput
                type="file"
                ref={ImageInputRef}
                onChange={(e) => handleImageUpload(e)}
                accept="image/png,image/jpeg">
                </ImageUploadInput>    
        </ImageUploadWrapper>
        <TextInput type="text" placeholder="username"/>
        <TextInput type="password" placeholder="password"/>
        <TextInput type="text" placeholder="Description"/>
        <ActionButtonWrapper>
              <ActionButton onClick={(e) => signUp(e)} type="submit" value="Sign Up"/>
        </ActionButtonWrapper>
        </>
        }

        <SubSwitch onClick={() => toggleMode()}>{mode && "Click to register"}{!mode && "Click to signin"}</SubSwitch>
    </LayoutContainer>
    );
  };
  
  export default SignInUp;