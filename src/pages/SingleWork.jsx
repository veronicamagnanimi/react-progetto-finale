import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Icons from "../components/Icons";

const SingleWork = () => {
  const { id } = useParams();
  const [singleWork, setSingleWork] = useState(null);
  const [loading, setLoading] = useState(true); 

  //API
  const apiLaravel = import.meta.env.VITE_API_URL;
  const backendImg = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    setLoading(true);  // imposta lo stato di caricamento a true
    axios.get(`${apiLaravel}/${id}`).then((resp) => {
      setSingleWork(resp.data.data);
      setLoading(false);  // imposta lo stato di caricamento a false quando i dati sono stati ricevuti
    }).catch((error) => {
      console.error("Error loading single work:", error);
      setLoading(false);  // imposta lo stato di caricamento a false anche in caso di errore
    });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;  
  }

  if (!singleWork) {
    return <div className="text-center mt-5">Opera non trovata.</div>;  
  }

  const imageUrl = singleWork.image
    ? `${backendImg}/storage/${singleWork.image}`
    : `${backendImg}/images/default.jpg`;

  return (
    <>
      <div className="work-details mt-5 mb-5">
        <div className="text-start mb-4">
          <Link to="/" className="back-icon">
            <i className="bi bi-arrow-left-circle-fill fs-2"></i>
          </Link>
        </div>

        <div className="text-center mb-4">
          <img
            src={imageUrl}
            alt={singleWork.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
            onError={(e) => {
              e.target.src = `${backendImg}/images/default.jpg`;
            }}
          />
        </div>

        <h2 className="text-center">{singleWork.name}</h2>
        <h5 className="text-center">
          Dipinto da{" "}
          <a href="#" data-bs-toggle="modal" data-bs-target="#painterModal">
            {singleWork.painter.name}
          </a>
        </h5>

        <p className="text-center">
          <strong>Anno:</strong> {singleWork.year}
        </p>
        <p className="text-center">
          <strong>Luogo:</strong> {singleWork.location}
        </p>
        <p className="lead text-center">
          {singleWork.description || "Nessuna descrizione disponibile."}
        </p>

        <Icons />

{/* bottone 3d */}
        <div className="text-center mt-4">
  <button
    type="button"
    className="btn btn-outline-dark"
    data-bs-toggle="modal"
    data-bs-target="#modal3D"
  >
    Visiona in 3D
  </button>
</div>



      </div>

      {/* Modale per la descrizione del pittore */}
      <div
        className="modal fade"
        id="painterModal"
        tabIndex="-1"
        aria-labelledby="painterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="painterModalLabel">
                {singleWork.painter.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Chiudi"
              ></button>
            </div>
            <div className="modal-body">
              <p>{singleWork.painter.description}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>

{/* Modale 3d */}
      <div
  className="modal fade"
  id="modal3D"
  tabIndex="-1"
  aria-labelledby="modal3DLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content p-3">
      <div className="modal-header">
        <h5 className="modal-title" id="modal3DLabel">
          Visione 3D: {singleWork.name}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Chiudi"
        ></button>
      </div>
      <div className="modal-body text-center">
        <div className="image-3d-container">
          <img
            src={imageUrl}
            alt={singleWork.name}
            className="img-fluid image-3d"
            style={{ maxHeight: "500px" }}
          />
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default SingleWork;

