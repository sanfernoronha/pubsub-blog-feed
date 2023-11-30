import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Create = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("mario")
    const [chipInput, setChipInput] = useState('')
    const [selectedChips, setSelectedChips] = useState([])
    const [isPending, setIsPending] = useState(false)

    const userId = useSelector((state) => state.user.userId)

    useEffect(() => {
  
    }, [userId])

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { userID: userId,title, body, author, tags: selectedChips};
        
        setIsPending(true)
        //mock api
        // fetch('http://localhost:8000/blogs', {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(blog)
        // }).then (() => {
        //     console.log("New Blog Added!");
        //     setIsPending(false)
        //     history.push('/')
        // })


        //our api calls
        fetch('http://localhost:3001/publishBlog', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(blog)
        }).then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json()
        }).then((data) => {
          console.log('Success:', data);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setIsPending(false)
          // history.push('/')
        })
        
    }

    const handleChipInputChange = (event) => {
        setChipInput(event.target.value);
      };
    
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' && chipInput.trim() !== '') {
          addChip();
        }
      };
    
      const handleBlur = () => {
        if (chipInput.trim() !== '') {
          addChip();
        }
      };

      const addChip = () => {
        setSelectedChips((prevChips) => {
          const newChips = [...prevChips, chipInput.trim()];
          setChipInput('');
          console.log(newChips); // Log the updated selectedChips immediately
          return newChips;
        });
      };
    
    
      const handleRemoveChip = (chipToRemove) => {

        console.log(selectedChips);
        setSelectedChips((prevChips) => {
          const updatedChips = prevChips.filter((chip) => chip !== chipToRemove);
          console.log(updatedChips); // Log the updated selectedChips immediately
          return updatedChips;
        });
      };
    

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog title:</label>
                <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="styled-input"
                />

                <label>Blog body:</label>
                
                <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Blog author:</label>
                <select 
                value={ author }
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>

                <label>Blog tags:</label>

                <Autocomplete
                    multiple
                    id="chip-input"
                    options={[]}
                    freeSolo
                    value={selectedChips}
                    onChange={(event, value) => setSelectedChips(value)}
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip
                        label={option}
                        onDelete={(option) => handleRemoveChip(option)}
                        color="primary"
                        variant="outlined"
                        {...getTagProps({ index })}
                    />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        value={chipInput}
                        onChange={handleChipInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        placeholder="Enter Tag"
                    />
                    )}
                />

               
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
     );
}
 
export default Create;


