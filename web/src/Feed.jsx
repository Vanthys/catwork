import { useEffect, useState } from "react"
import styled from "styled-components";
import EmptyHeart from "./assets/heart_empty.svg";
import FullHeart from "./assets/heart_full.svg";


const PostWrapper = styled.div`
  border: 0px solid grey;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  margin: 0em 1em 1em 1em;
  box-shadow: 7px 6px 20px #0000009e;
  width: 300px;
  height: 400px;
  overflow: hidden;
`;

const PostImg = styled.img`
  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
  width: 100%;
  height: 70%;
  object-fit: cover;
  cursor: pointer;
`;

const PostDesc = styled.div`
  display: flex;  
  flex-direction: column;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  
  background-color: #2e4d58; //#343333;
  background: linear-gradient(163deg, rgba(189,139,159,1) 0%, rgba(46,77,88,1) 100%);
  height: 30%;
  color: white;
  padding: 0.5em;
`;

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  justify-items: center;
`;

const DescriptionHeader = styled.div`
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 75% 10% 7.5% 7.5%; 
  grid-template-rows: 50% 50%; 
  gap: 0px 0px; 
  grid-template-areas: 
    "title title like like"
    "author time time time"; 
    /*
display: flex;
flex-direction: row;
justify-content: space-between;
flex-wrap: nowrap;
*/
& {
  color: #ffffff;
}
`;


const DescriptionBody = styled.div`
padding: 4px;
border-top: 1px solid;  
border-image: linear-gradient(163deg, #ff0c0c 0%, #1fb2de 100%);
color: #dbdada;
`;





const base_url = "https://cdn2.thecatapi.com/images/";


const loadImages = async (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    arr.push({ src: data[0].id });
    await Sleep(100);
  }
  return arr;
};

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const LikeWrapper = styled.img`
width: 1em;
height: 1em;
cursor: pointer;
`;

function Feed({filter}) {

  ;
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("http://127.0.0.1:80/catwork/post", {
                  method: "GET",
                  headers: {
                          "Accept": "application/json"
                  },
                  credentials: 'include'
            });
      const data = await response.json()
      setPosts([...data]);
    };

    fetchPost();
    }, [filter])
  
    const getDateString = (time) => {
      const dt = new Date(time.replace(' ', 'T'));
      const diffInMs = new Date() - dt;
      const diffInSec = diffInMs / 1000;  // Convert milliseconds to seconds
  
      const days = Math.floor(diffInSec / (3600 * 24));
      const hours = Math.floor((diffInSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSec % 3600) / 60);

      let rs = "";
      if (days > 0) {
          rs = days + "d ago";
      } else if (hours > 0) {
          rs = hours + "h ago";
      } else if(minutes > 0) {
          rs = minutes + "m ago";
      } else if(diffInSec > 1){
        rs = Math.floor(diffInSec) + "s ago"
      }else {
        rs = "just now"
      }
      return rs;
    }

    const [liked, setLiked] = useState([]);
    
    const toggleLike = (id) => {
    
      let arr = [...liked];
        if (arr.includes(id)) {
          arr = arr.filter(item => item != id)
        }
        else {
          arr.push(id);
        }
          //call server
        setLiked(arr)
    }
    const justLike = (id) =>{
      let arr = [...liked];
      if (!arr.includes(id)) {
        arr.push(id);
      }
      setLiked(arr);
    }
    //[{src: base_url + "2al.jpg"}, {src: base_url + "83l.jpg"}, {src: base_url + "8ji.jpg"} ])
  //.filter((element) => element.src.includes(filter))
    return (
      <FeedWrapper>
        {posts.sort((a, b) => (a.timestamp - b.timestamp)).map((element, id) => {
            return ( 
              <PostWrapper key={element.id} onDoubleClick={() => justLike(element.id)}>
                <PostImg src={element.image} />
                <PostDesc>
                  <DescriptionHeader>
                    <span style={{fontStyle: "italic", "grid-area" : "title"}}>{element.title}</span>
                    {/*<span style={{"grid"}}>&nbsp; - &nbsp;</span>*/}
                    <span style={{fontStyle: "italic", "grid-area" : "author"}}>{element.author_id /*todo replace with name*/}</span> 
                    <span style={{fontStyle: "italic", "grid-area" : "time"}}>{getDateString(element.timestamp)}</span>
                    <span style={{fontStyle: "italic", "grid-area" : "like"}} onClick={() => toggleLike(element.id)}><LikeWrapper src={liked.includes(element.id) ? FullHeart : EmptyHeart }/></span>
                  </DescriptionHeader>
                  <DescriptionBody>
                    {element.description}
                  </DescriptionBody>
                  
                  
                  
                </PostDesc>
              </PostWrapper>
            )
        })}
      </FeedWrapper>
       
    )
  }
  
  export default Feed

  