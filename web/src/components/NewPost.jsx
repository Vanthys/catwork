import { useRef, useState } from "react";
import styled from "styled-components"
import media from "styled-media-query";
import ImageIcon from "../assets/image.svg"


import { toast } from 'react-toastify';


const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    transition: width 200ms ease-in-out;
  ${media.lessThan("medium")`
    width: 80vw;
  `}
  ${media.greaterThan("medium")`
    width: 500px;
  `}
`;

const ImageUploadWrapper = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 0.5em;

  /* default image */
  background: url('${props => props.$image}');
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
   font-family: "Josefin Sans", sans-serif;
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



const NewPost = ({ user, toggleModal, update }) => {

    const [image, setImage] = useState(ImageIcon);

    const ImageInputRef = useRef(null);
    const TitleInputRef = useRef(null);
    const DescriptionInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (!image)
            return;

        if (!image.type.includes('image')) {
            toast.error('only images are allowed');
            return;
        }

        if (image.size > 10_000_000) {
            toast.error('maximum upload size is 10mb');
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onload = (fileReaderEvent) => {

            setImage(fileReaderEvent.target.result)

        }
    }

    const handlePost = (e) => {
        e.preventDefault();

        if (!image) {
            toast.warn("no image selected")
            return
        }

        const payload = {
            "author_id": user?.id, //TODO: CHECK IN BACKEND OB AUTHOR_ID == SESSION_ID HASH
            "title": TitleInputRef.current.value,
            "description": DescriptionInputRef.current.value,
            "image": image,
            "timestamp": Date.now()
        }


        fetch(import.meta.env.VITE_BASE_URL + "/catwork/post", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        })

            .then((res) => {
                if (res.status != 301) {
                    toast.error("upload failed")
                }
                return res.json()
            })
            .then((data) => {
                update();
                toggleModal();
                toast.success("upload sucessfull")
                setImage(ImageIcon)
                TitleInputRef.current.value = "";
                DescriptionInputRef.current.value = "";
                
            })
            .catch((error) => {
                //console.error("Failed to post new post. Are you logged in?", error)
                toast.error("upload failed")
            });

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
                <br />
                <label>
                    Title
                </label>
                <TitleInput type="text" placeholder="title..." ref={TitleInputRef} />
                <br />
                <label>
                    Description
                </label>
                <DescriptionInput type="textarea" placeholder="description..." ref={DescriptionInputRef} />
            </FormContainer>
            <br />
            <PostButtonWrapper>
                <PostButton onClick={(e) => handlePost(e)} type="submit" value="Post" />
            </PostButtonWrapper>
        </>

    )
}

export default NewPost