import React, { useEffect } from 'react'
import { useState } from 'react'

const Form = () => {
     // http://localhost:8000/posts

     const initialState = {
        salary: "",
        image: "",
        title: "",
        status: false
     }
        
     const [data,setData] = useState([]);
     const [page,setPage] = useState(1);
     const [limit,setLimit] = useState(5);
     const [form,setForm] = useState(initialState)
     const [loading, setLoading] = useState(false);
     const [error,setError] = useState(false);

     const handleLimitChange = (e)=> {
        setLimit(e.target.value)
     }


      useEffect(()=> {
        getdata()
      },[page,limit])


     const getdata = ()=> {
        setLoading(true)
        return fetch(`http://localhost:8000/posts?_page=${page}&_limit=${limit}`)
        .then((res)=> res.json())
        .then((res)=> setData(res))
        .catch(()=> setError(true))
        .finally(()=> setLoading(false));
        
     }

      const addProduct = (image,title,price) => {

        const payload = {
            image,
            title,
            price,
            status: false
        }
        setLoading(true)
        return fetch(`http://localhost:8000/posts?_page=${page}&_limit=${limit}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res)=> res.json())
        .then((res)=> {
            return getdata()
        })
        .catch(()=> setError(true))
        .finally(()=> setLoading(false))
      }


     const handleOnchange = (e)=> {
        let {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
     }

     const handleOnSubmit = (e)=> {
        e.preventDefault()
        console.log(form)
     }
  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <input type="url"
            placeholder='Enter Image URL'
            name="image"
            value={form.image}
             onChange={handleOnchange}
            />{" "}
            <input type="text"
            placeholder='Enter Product Title'
            name="title"
            value={form.title}
            onChange={handleOnchange}

            />{" "}
            <input type="number" 
            placeholder='Enter Price'
            name="price"
            value={form.price}
            onChange={handleOnchange}

            /> {" "}
            <button onClick={()=> addProduct(form.image,form.title,form.price)}  >Add</button>
        </form>

        <div>
            <button disabled={page === 1} onClick={()=> setPage(page-1)}> Prev</button> <span>Page: {page} {" "} Limit: {limit} {" "}</span>
            <button disabled={data.length < limit} onClick={()=> setPage(page+1)} >Next</button>
            <select name="limit" onChange={handleLimitChange} >
                <option >Select Limit</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                
            </select>
        </div>


      <div className='container'>  {data.map((d)=> (
            <div className='main' key={d.id}>
                <img src={d.image} width="100px" alt="" />
                <p>{d.title}</p>
                <h3>${d.price}</h3>
            </div>
        ))}</div>
    </div>
  )
}

export default Form