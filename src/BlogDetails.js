import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  function stringAvatar(name) {
    const initials = name.includes(' ')
      ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
      : `${name[0]}`;
  
      
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials.toUpperCase(),
    };
  }

const BlogDetails = () => {

    const { id } = useParams()

    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id)

    const history = useHistory()
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: "DELETE",
        }).then (() => {
            history.push('/')
        })
    }
    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2> { blog.title} </h2>
                    <div style={{ display: "flex" , alignItems: "center" ,gap: 10}}>
                    <Avatar {...stringAvatar(blog.author)}/>
                    <p>Written by {blog.author} </p>
                    </div>
                    <div>{ blog.body} </div>
                    <button onClick={ handleClick }>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;