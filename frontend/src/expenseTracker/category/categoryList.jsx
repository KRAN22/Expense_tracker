import "./category.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useState,useEffect } from "react";
import axios from "axios";

export const CategoryList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getCategory();
      }, []);
    
      const getCategory = async () => {
        const baseURL = "http://127.0.0.1:8000/api/category/";
        try {
          const response = await axios.get(baseURL);
          setList(response.data);
        } catch (e) {
          console.log(e.response.data);
        }
      };

    const OnClickDelete = async(id)=>{
      const baseURL = `http://127.0.0.1:8000/api/category/deleteCategory/${id}`
      try{
        const response = await axios.delete(baseURL)
        if(response){
          window.location.reload()
        }
      }catch (e){
        console.log(e.response.data);
      }
    }
    
    const onClickEdit = ()=>{

    }


  return (
    <div className="category-list">
      <div className="list-box">
        <h1>Category list</h1>
        <div className="category-list-items">
          <div className="id">
            <h2>ID</h2>
          </div>
          <div className="category">
            <h2>CATEGORIES NAME</h2>
          </div>
          <div className="edit">
            <h2>EDIT</h2>
          </div>
          <div className="delete">
            <h2>DELETE</h2>
          </div>
        </div>
        <hr className="hr"></hr>
        <div>
          {list.map((item) => {
            return (
              <div key={item.id} className="category-list-items">
                <div className="id">
                  <h2>{item.id}</h2>
                </div>
                <div className="category">
                  <h2>{item.categoryName}</h2>
                </div>
                <div className="edit">
                  <button onClick={()=>onClickEdit()}>
                    <EditIcon />
                  </button>
                </div>
                <div className="delete">
                  <button onClick={() => OnClickDelete(item.id)}>
                    <DeleteTwoToneIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
