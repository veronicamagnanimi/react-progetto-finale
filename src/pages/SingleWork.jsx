import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleWork = () => {
  const { id } = useParams();
  const [singleWork, setSingleWork] = useState(null);

  const apiLaravel = import.meta.env.VITE_API_URL;
  const backendImg = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    axios.get(`${apiLaravel}/${id}`).then((resp) => {
      setSingleWork(resp.data.data);
    });
  }, [id]);

  if (!singleWork) return <p>Opera non trovata</p>;

  const imageUrl = singleWork.image
    ? `${backendImg}/storage/${singleWork.image}`
    : `${backendImg}/images/default.jpg`;

  return (
    <div className="work-details mt-5 mb-5">
      <div className="text-start mb-4">
        <Link to="/" className="back-icon">
          <i className="bi bi-arrow-left"></i> Torna alla lista
        </Link>
      </div>

      <div className="text-center mb-4">
        <img
          src={imageUrl}
          alt={singleWork.name}
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = `${backendImg}/images/default.jpg`;
          }}
        />
      </div>

      <h2 className="text-center">{singleWork.name}</h2>
      <h5 className="text-center">di {singleWork.painter.name}</h5>

      <p><strong>Anno:</strong> {singleWork.year}</p>
      <p><strong>Luogo:</strong> {singleWork.location}</p>
      <p className="lead">{singleWork.description || "Nessuna descrizione disponibile."}</p>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-warning">Torna Indietro</Link>
      </div>
    </div>
  );
};

export default SingleWork;
