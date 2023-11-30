import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";


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

    const [blog, setBlog] = useState(null)

    

    useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blog/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const data = await response.json();
        setBlog(data.data);
        
      } catch (error) {
      }
    };

    fetchBlog();
  }, [id]);
    return ( 
        <div className="blog-details">
          
            { blog && (
                <article>
                    <h2> { blog.blog_name} </h2>
                    <div style={{ display: "flex" , alignItems: "center" ,gap: 10}}>
                    <Avatar {...stringAvatar(blog.blog_author)}/>
                    <p>Written by {blog.blog_author} </p>
                    </div>
                    <div>{ blog.blog_contents} </div>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;