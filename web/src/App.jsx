import { useState } from 'react'
import ProfileBubble from './components/ProfileBubble';
import PostButton from './components/PostButton';
import styled from "styled-components";
import Feed from './Feed';


const Container = styled.div`
    justify-content: center;
`;


function App() {

const [filter, setFilter] = useState("")
const update = () => {
  setFilter(Math.random());
}
  return (
    <>
      <ProfileBubble filterCallback={setFilter}/>
      <Feed filter={filter}/>
      <PostButton update={update}/>
    </>
  )
}

export default App
