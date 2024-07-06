import styled from "styled-components";
import { useState, useRef} from "react";
import UserIcon from '../assets/user.svg';
import media from "styled-media-query";
import { toast } from "react-toastify";

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
    border:none;
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

    &:invalid:focus:not(:placeholder-shown) {
        border-bottom: 4px solid #fc6a6a;
    }
    &:invalid:not(:focus):not(:placeholder-shown) {
      border-bottom: 6px solid #fa3939;
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

const SignInUp = ({onClose, setUser}) => {

    const [mode, setMode] = useState(true)


    const toggleMode = () => {
        setMode(!mode)
    }

    const [image, setImage] = useState(UserIcon);
    

    const ImageInputRef = useRef(null);
    const signUpPW = useRef(null);
    const signUpPWV = useRef(null)



    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (!image)
          return;

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

    // ! SIGN IN
    const signIn = (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value; 
      fetch(import.meta.env.VITE_BASE_URL + "/catwork/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",     
            "Content-Type": "application/json"
          },
        credentials: 'include',
        body: JSON.stringify({"user": username, "password": password})
      })
      .then((res) => res.json())
      .then((data) => {
        setUser(data["user"]);
        document.cookie = "id=" + data["cookie"] + ";";
        toast.success("sign in successfull")
        onClose();
        
      })
      .catch((error) => {
        //console.error('Error:', error);
        toast.error("sign in failed")
      });
    } 


    const validatePassword = (e) => {
      if(signUpPW.current.value != signUpPWV.current.value) {
        signUpPWV.current.setCustomValidity("passwords don't match");
      } else {
        signUpPWV.current.setCustomValidity('');
      }
    }

    // ! SIGN UP
    const signUp = (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      const confirmpassword = e.target.passwordv.value;
      const description = e.target.description.value;
      

      if (password!=confirmpassword)
        {
          toast.warn("passwords don't match")
          return;
        }
      
      
      fetch(import.meta.env.VITE_BASE_URL + "/catwork/signup", {
        method: "POST",
        headers: {
            "Accept": "application/json",     
            "Content-Type": "application/json"
          },
        credentials: 'include',
        body: JSON.stringify({"username": username, "password": password, "description": description, "image": image})
      })
      .then((res) => {
        if (res.status == 226){
          toast.error("username taken")
          throw new "username taken";
        }
        if (res.status != 200){
          throw new "unknown error"
        }
        return res.json()
      })
      .then((data) => {
        //console.log(data)
        setUser(data["user"]);
        document.cookie = "id=" + data["cookie"] + ";";
        toast.success("sign up successful")
        onClose();
        
      })
      .catch((error) => {
        //console.error('Error:', error);
        toast.warn("sign up failed")
      });
    }

    return (
    <LayoutContainer onSubmit={(e) => mode ? signIn(e) : signUp(e)}>
        {mode && 
        <>
        <h2>sign in</h2>
            <TextInput name="username" type="text" placeholder="username" minLength="4" maxLength="25" pattern="[a-zA-Z0-9_.]{4,25}" required/>
            <TextInput name="password" type="password" placeholder="password" minLength="4" maxLength="25" pattern=".{4,25}" required/>
            <ActionButtonWrapper>
              <ActionButton type="submit" value="sign in"/>
            </ActionButtonWrapper>
        </>
        }
        {!mode &&
        <>
        <h2>sign up</h2>
        <ImageUploadWrapper $image={image}>
                <ImageUploadInput
                type="file"
                ref={ImageInputRef}
                onChange={(e) => handleImageUpload(e)}
                accept="image/png,image/jpeg">
                </ImageUploadInput>    
        </ImageUploadWrapper>
        <TextInput type="text" name="username" placeholder="username" required pattern="[a-zA-Z0-9_.]{4,25}"/>
        <TextInput type="password" ref={signUpPW} onChange={validatePassword} name="password" placeholder="password" required pattern=".{4,25}"/>
        <TextInput type="password" ref={signUpPWV} onChange={validatePassword} name="passwordv" placeholder="confirm password" required/>
        
        <TextInput type="textbox" name="description" placeholder="description"/>
        <ActionButtonWrapper>
              <ActionButton type="submit" value="sign up"/>
        </ActionButtonWrapper>
        </>
        }

        <SubSwitch onClick={() => toggleMode()}>{mode && "click to register"}{!mode && "click to signin"}</SubSwitch>
    </LayoutContainer>
    );
  };
  
  export default SignInUp;