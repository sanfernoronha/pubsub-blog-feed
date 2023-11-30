import { useState, useEffect} from 'react'
import BlogList from './BlogList';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const Home = () => {
    const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')
    const userId = useSelector((state) => state.user.userId)
    
    useEffect(() => {

      // create a socket on 3001 port
      const socket = io('http://localhost:3001');
      // SOCKET: fetch blogs using user id 
      socket.emit('getMyHome', userId);
      socket.on('blogs', (blogs) => {
        console.log(`Received `, blogs);
      });

        // test our backend fetch
        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:3001/blogs/${userId}`);
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

        fetchData()
    }, [userId])
    
    return ( 
        <div className="home">
            { error && <div> { error} </div> }
            { isPending && <div>Loading...</div>}
            { blogs && <BlogList blogs = {blogs} title = "All Blogs" />  }
        </div>
     );
}
 
export default Home;