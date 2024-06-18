import styled from "styled-components";
import PlusIcon from '../assets/plus.svg';
import Modal from "./Modal";
import NewPost from "./NewPost";
import { useState } from "react";

const Container = styled.div`
 position: fixed;
bottom: 2em;
right: 2em;
width: 3em;
height: 3em;
display: flex;
justify-content: center;
align-items: center;
`;

const ImageWrapper = styled.img`
width: 3em;
height: 3em;
cursor: pointer;
`;

const PostButton = ({user, showLoginMask, update}) => {

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    
    const handle_click = () => {
        if (false){
            showLoginMask()
        }
        else{
            toggleModal()
        }
    }

    return (
    <>
     <Container onClick={() => handle_click()}>
        <ImageWrapper src={PlusIcon}/>    
    </Container>
    <Modal isOpen={modalOpen} onClose={toggleModal}>
            <h2>New Post</h2>
            <NewPost toggleModal={toggleModal} update={update}/>
    </Modal>
    </>
   
    );
  };
  
  export default PostButton;