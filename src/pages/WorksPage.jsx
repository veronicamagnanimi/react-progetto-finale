import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import WorkCard from '../components/WorkCard';

const WorksPage = () => {
  const [works, setWorks] = useState([]);

const apiLaravel = import.meta.env.VITE_API_URL;

useEffect(() => {
    axios.get(`${apiLaravel}`).then((resp) => {
        setWorks(resp.data.data);
    console.log(resp.data);
    })
}, []);

    return (
        <>
        <h1>Tutte le opere</h1>

        {works.map((work) => (
            <div className="col" key="work.id">
                <WorkCard work={work} />
            </div>
        ))}
        </>
    )
}

export default WorksPage;