import { useState, useRef, useEffect } from "react";
import SearchIcon from '../assets/search.svg';
import styled from "styled-components";
import Modal from "./Modal";
import UserProfile from "./UserProfile";
import UserIcon from '../assets/user.svg';

const Container = styled.div`
    transform: translateZ(0); /* Promote to its own layer */
    will-change: top;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    width: max-content;
    display: flex;
    flex-direction: row;
    border-bottom-right-radius: 1em;
    background-color: #3b373d;
    box-shadow: 3px 3px 20px 5px #0000009e;//7px 6px 20px #0000009e;
    padding: 0 0.5em 0 0;
    transition: width 100ms ease-in-out;
`;

const ProfileImg = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 2em;
    outline: 1px solid #a78d8d;
    object-fit: cover;
`;

const ImgContainer = styled.div`
    margin: 0.2em;
    margin-right: 0.5em;
`;

const UserName = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    margin-left: 1em;
    margin-right: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const SearchIconWrapper = styled.img`
    width: 1.5em;
    height: 1.5em;
`;

const SearchInput = styled.input`
    border: none;
    font-size: 1em;
    background-color: #3b373d;
    color: white;
    border-bottom: 1px solid white;
    transition: width 100ms ease-in-out;
    width: ${props => props.$expanded != "" ? Math.min(props.$expanded.length, 30) + "ch" :"1.5em"};

    &:focus {
        outline: none;
        width: 30ch;
    }
`;


const ActionButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;    
`;

const ActionButton = styled.button`
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

function ProfileBubble({ user, showLoginMask, setUser, filterCallback }) {
    const inputRef = useRef(null);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        if (inputRef.current) {
            setInputValue(inputRef.current.value);
        }
    }, [inputValue]);

    const handleSearchClick = () => {
        setSearchExpanded(true);

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10);
    };

    const handleBlur = (e) => {
        if(inputRef.current && inputRef.current.value == "")
            setSearchExpanded(false);
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
        //filterCallback(e.target.value);
    }

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        if (!modalOpen && !user && true){
            showLoginMask()
        }else {
            setModalOpen(!modalOpen);
        }
    };
    
    return (
        <> 
        <Container >
            <ImgContainer onClick={toggleModal}>
                <ProfileImg src={user?.image ?? UserIcon} />
            </ImgContainer>
            <UserName onClick={toggleModal}>
                {user?.username ||
                (
                <ActionButtonWrapper>
                    <ActionButton>sign in</ActionButton>
                </ActionButtonWrapper>
                )
            }
            </UserName>
            <SearchContainer>
                <SearchInput
                    style={{ display: searchExpanded ? "block" : "none" }}
                    ref={inputRef}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Suchen..."
                    onInput={handleInput}
                    $expanded={inputValue}
                />
                <SearchIconWrapper
                    style={{ display: searchExpanded ? "none" : "flex" }}
                    src={SearchIcon}
                    onClick={handleSearchClick}
                />
            </SearchContainer>
        </Container>
        <Modal isOpen={modalOpen} onClose={toggleModal}>
            <h2>Profile</h2>
            <UserProfile 
            name={user?.username} 
            img={user?.image} 
            bio={user?.description}
            setUser={setUser}/>
        </Modal>
        
      </>
    );
}

export default ProfileBubble;
