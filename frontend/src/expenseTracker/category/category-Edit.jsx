import "./category.css"
import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import { useState } from "react"
import axios from "axios"


export const CategoryEdit = (props)=>{
    const name = props.category.categoryName
    const id = props.category.ids
    const [categoryName,setCategoryName] = useState(name) 

    const onChangeHandler=(e)=>{
        setCategoryName(e.target.value);
    }

    const onClickSubmit = async() =>{
        const baseURL = `http://127.0.0.1:8000/api/category/updateCategory/${id}`
        const body = {categoryName}
        try{
            const response = await axios.put(baseURL,body)
            if(response){
                window.location.reload()
            }
        }catch (e){
            console.log(e.response.data);
        }
    }

    return (
        <div className="category-main">
        <div className="category-add">
          <div className="box">
            <h1>Edit your Category</h1>
            <div className="tag">
              <TextField
                id="outlined-basic"
                label="category"
                variant="outlined"
                type={"text"}
                value={categoryName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="tag">
              <Button
                id="category-Btn"
                variant="contained"
                onClick={onClickSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

