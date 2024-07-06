import { useEffect, useState } from "react"
import styled from "styled-components";
import EmptyHeart from "./assets/heart_empty.svg";
import FullHeart from "./assets/heart_full.svg";
import { toast } from "react-toastify";


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


const LikeImage = styled.img`
width: 1em;
height: 1em;
cursor: pointer;
`;

const LikeNumber = styled.span`
margin-right: 0.5em;
font-weight: 200;
`;

const TitleWrapper = styled.div`
grid-area: title;
`;

const AuthorWrapper = styled.div`
grid-area: author;
font-style: italic;
font-weight: 300;
`;

const TimeWrapper = styled.div`
grid-area: time;
font-weight: 300;
`;

const LikeWrapper = styled.div`
grid-area: like;
display: flex;

`;

function Feed({filter, user, showLoginMask}) {

  
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/catwork/post", {
                  method: "GET",
                  headers: {
                          "Accept": "application/json"
                  },
                  credentials: 'include'
            });
      const resjson = await response.json()
      const data = resjson.map(element => {
        let new_element = element;
        let liked_by = JSON.parse(element.liked_by)
        if (typeof liked_by == 'object' && !Array.isArray(liked_by) && liked_by != null) {
          if (Object.keys(liked_by).length == 0) {
            liked_by = [];
          }
          else {
            liked_by = Object.values(liked_by);
          }
        }
        new_element.liked_by = liked_by;
        return new_element;
      });
      
      setPosts([...data]);
    };

    const fetchUsers = async () => {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/catwork/user", {
        method: "GET",
        headers: {
                "Accept": "application/json"
        },
        credentials: 'include'
      });
      const resjson = await response.json()
      setUsers([...resjson])
    }


    fetchPost();
    fetchUsers();

    //console.log(users)
    }, [filter, user])
  
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

    
    const toggleLike = (id) => {
      
      if(!user){
          showLoginMask();
          return;
        }

        let method = "POST";


        let post = posts.find(element => element.id == id);

        if(post.liked_by.includes(user.id)){
          method = "DELETE";
        }


      fetch(import.meta.env.VITE_BASE_URL + "/catwork/like/" + id, {method: method, credentials: "include"})
        .then(res => {
          if(res.status == 404){
            toast.warn("post does not exist")
            throw "post does not exist"
          }
          if(res.status == 403){
            toast.warn("unauthorized")
            throw "post does not exist"
          }
          
          return res.json();
        })
        .then(data => {
            if (data["success"]){
              const updatedPosts = posts.map(post => {
                if (post.id === id) {
                  const updatedLikedBy = method === "POST" 
                    ? (post.liked_by.includes(user.id) ? [...post.liked_by] : [...post.liked_by, user.id])
                    : post.liked_by.filter(userId => userId !== user.id);
                  return { ...post, liked_by: updatedLikedBy };
                }
                return post;
              });
              setPosts(updatedPosts);
            };
        })
        .catch(error => {
          toast.error("failed to like");
        });
    }


    const justLike = (id) =>{

      if(!user)
        {
          showLoginMask();
          return;
        }

        let post = posts.find(element => element.id == id);
        if(post.liked_by.includes(user.id)){
          return;
        }

        
        fetch(import.meta.env.VITE_BASE_URL + "/catwork/like/" + id, {method: "POST", credentials: "include"})
        .then(res => {
          if(res.status == 404){
            toast.warn("post does not exist")
            throw "post does not exist"
          }
          if(res.status == 403){
            toast.warn("unauthorized")
            throw "post does not exist"
          }
          
          return res.json();
        })
        .then(data => {
            if (data["success"]){
              const updatedPosts = posts.map(post => {
                if (post.id === id) {
                  const updatedLikedBy = [...post.liked_by, user.id];
                  return { ...post, liked_by: updatedLikedBy };
                }
                return post;
              });
              setPosts(updatedPosts);
            };
        })
        .catch(error => {
          toast.error("failed to like");
        });
    }


    return (
      <FeedWrapper>
        {posts.sort((a, b) => (a.timestamp - b.timestamp)).map((element, id) => {
                    
          
            return ( 
              <PostWrapper key={element.id} onDoubleClick={() => justLike(element.id)}>
                <PostImg src={element.image} />
                <PostDesc>
                  <DescriptionHeader>
                    <TitleWrapper>{element.title}</TitleWrapper>
                    <AuthorWrapper>{users.find(e => e.id == element.author_id)?.username ?? "unknown"}</AuthorWrapper> 
                    <TimeWrapper>{getDateString(element.timestamp)}</TimeWrapper>
                    <LikeWrapper onClick={() => toggleLike(element.id)}>
                        <LikeNumber>
                          {element.liked_by.length > 0 ? element.liked_by.length : " "} 
                        </LikeNumber>
                        
                      <LikeImage src={element.liked_by.includes((user?.id) ?? -1) ? FullHeart : EmptyHeart }/>
                    </LikeWrapper>
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

  