import { useState, useEffect } from "react";
import axios from "axios";
import WorkCard from "../components/WorkCard";
import Icons from "../components/Icons";

const WorksPage = () => {
  const [works, setWorks] = useState([]);

  //API
  const apiLaravel = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiLaravel}`).then((resp) => {
      setWorks(resp.data.data);
      console.log(resp.data);
    });
  }, []);

  return (
    <>
    <div className="container">
      <h1 className="text-center my-4">Tutte le opere</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {works.map((work) => (
          <div key={work.id} className="col-md-4 mb-4">
            <WorkCard work={work} />
          </div>
        ))}
      </div>
      </div>
      <Icons />
    </>
  );
};

export default WorksPage;
