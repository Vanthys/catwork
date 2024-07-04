import { useEffect, useState } from 'react'
import ProfileBubble from './components/ProfileBubble';
import PostButton from './components/PostButton';
import styled from "styled-components";
import Feed from './Feed';
import Modal from './components/Modal';
import SignInUp from './components/SignInUp';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
    justify-content: center;
`;


function App() {

  const [filter, setFilter] = useState("")
  const [user, setUser] = useState(null)

  const [loginMask, setLoginMask] = useState(false)




  useEffect(() => {
    //console.log(document.cookie["user"]);
  }, [user])

  const showLoginMask = () => {
    setLoginMask(true)
  }

  const update = () => {
    setFilter(Math.random()); //TODO: change
  }
  return (
    <>
      <ProfileBubble user={user} showLoginMask={showLoginMask} filterCallback={setFilter} setUser={setUser} />
      <Feed filter={filter} />
      <PostButton update={update} showLoginMask={showLoginMask} user={user} />

      <Modal isOpen={loginMask} onClose={() => setLoginMask(false)}>
        <SignInUp setUser={(hash) => setUser(hash)} />
      </Modal>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
