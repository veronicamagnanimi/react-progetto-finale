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
     <div className="hero-img position-relative text-white text-center">
  <img src="/images/hero.png" alt="hero" className="img-fluid w-100 hero-banner" />

  <div className="hero-text position-absolute top-50 start-50 translate-middle">
    <h1>"Dipingerò i tuoi occhi quando conoscerò la tua anima"</h1>
    <h5>Amedeo Modigliani</h5>
  </div>
</div>
    <div className="container mt-4">
      <h1 className="text-center mb-4 title-section">Quadri</h1>

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
