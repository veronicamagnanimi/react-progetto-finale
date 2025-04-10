import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleWork = () => {

    const { id } = useParams();
    const [singleWork, setSingleWork] = useState(null);
   
       //API
       const apiLaravel = import.meta.env.VITE_API_URL;
   
       useEffect(() => {
           axios.get(`${apiLaravel}/${id}`).then((resp) => {
               setSingleWork(resp.data.data);
               console.log(resp.data);
                   })
       }, [id])

       if(!singleWork)
       return <p>Opera non trovata</p>

    return (
        <>
   <h1>Dettagli</h1>
        </>
    )
}

export default SingleWork;