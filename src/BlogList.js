import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActions, Chip} from '@mui/material'
import Avatar from '@mui/material/Avatar';



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

const BlogList = ({blogs, title}) => {
    return ( 
        <div>
            <h2>{title} !</h2>
            { blogs.map( (blog) => (
                <Card key={blog.blog_id} className="blog-preview">
                    <CardContent>
                        <Link to={`/blogs/${blog.blog_id}`} style={{ textDecoration: 'none', color: 'primary' }}>
                        <Typography variant="h6" component="h1" fontSize={20} color='primary' marginBottom={4}>
                        {blog.blog_name}
                        </Typography>
                       
                        </Link>
                    </CardContent>
                    <CardActions className="tags" style={{ justifyContent: 'space-between'}}>
                        <div className="author-group">
                            <Avatar {...stringAvatar(blog.blog_author)}/>
                            <Typography color="textSecondary">
                            Written by {blog.blog_author}
                            </Typography>
                        </div>
                        <div className="tag-group">
                        {blog.tags.map((tag) => (
                        <Chip key={tag} variant="outlined" label={tag} size="small" color="primary" />
                        ))}
                        </div>
                    </CardActions>
                </Card>
            )) }
        </div>
     );
}
 
export default BlogList;