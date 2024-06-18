import { useRef, useState } from "react";
import styled from "styled-components"


const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

`;

const ImageUploadWrapper = styled.div`
  height: 250px;
  width: 50vw;
  position: relative;
  overflow: hidden;
  border-radius: 0.5em;

  /* default image */
  background: url('${props=> props.$image}');
  background-color: #ffffff54;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 7px 6px 20px #0000009e;
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


const TitleInput = styled.input`
    border: none;
    font-size: 1em;
    color: black;
    border-bottom: 1px solid white;
    transition: border 200ms ease-in-out;
    padding: 5px;
    box-shadow: 7px 6px 20px #0000009e;
    border-radius: 0.5em;
    &:focus{
        outline: none;
    }
    
`;


const DescriptionInput = styled.textarea`
    border: none;
    font-size: 1em;
    font-family: "Josefin Sans", sans-serif;
   
    color: black;
    border-radius: 0.5em;
    border-bottom: 1px solid white;
    width: 100%;
    height: 130px;
    box-sizing: border-box;
    resize: none;
    transition: border 200ms ease-in-out;
    padding: 5px;
    box-shadow: 7px 6px 20px #0000009e;

    &:focus{
        outline: none;
    }
`;

const PostButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;    
`;

const PostButton = styled.input`
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



const NewPost = ({toggleModal, update}) =>{

    const [image, setImage] = useState("https://cdn.iconscout.com/icon/free/png-256/free-image-preview-2715690-2265750.png");

    const ImageInputRef = useRef(null);
    const TitleInputRef = useRef(null);
    const DescriptionInputRef = useRef(null);

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

    const handlePost = (e) => {
        e.preventDefault();
        const payload = {
            "author_id" : 1,
            "title" : TitleInputRef.current.value,
            "description" : DescriptionInputRef.current.value,
            "image" : image,
            "timestamp" : Date.now()
        }
        fetch("http://127.0.0.1:80/catwork/post", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",     
                            "Content-Type": "application/json"        
                          },
                        body: JSON.stringify(payload)
                  })
                  .then(response => {
                    console.log(response)
                    if (response.status != 301) {
                        console.error("Failed to post new post. Are you logged in?")
                        return;
                    }
                    update();
                    toggleModal();
                    })
                    ;
    
    }

    return (
        <>
        <FormContainer>
            <ImageUploadWrapper $image={image}>
                <ImageUploadInput
                type="file"
                ref={ImageInputRef}
                onChange={(e) => handleImageUpload(e)}
                accept="image/png,image/jpeg">
                </ImageUploadInput>    
            </ImageUploadWrapper>
            <br/>
            <label>
                Title
            </label>
            <TitleInput type="text" placeholder="Title..." ref={TitleInputRef}/>
            <br/>
            <label>
                Description
            </label>
            <DescriptionInput type="textarea" placeholder="Description..." ref={DescriptionInputRef}/>
        </FormContainer>
        <br/>
        <PostButtonWrapper>
            <PostButton onClick={(e) => handlePost(e)} type="submit" value="Post"/>
        </PostButtonWrapper>
        </>

    )
}

export default NewPost