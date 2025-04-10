import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Icons from "../components/Icons";

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

  if (!singleWork) return <p>Caricamento..</p>;

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
      <h5 className="text-center">Dipinto da <a href="#" data-bs-toggle="modal" data-bs-target="#painterModal">
      {singleWork.painter.name}
    </a></h5>

      <p className="text-center"><strong>Anno:</strong> {singleWork.year}</p>
      <p className="text-center"><strong>Luogo:</strong> {singleWork.location}</p>
      <p className="lead text-center">{singleWork.description || "Nessuna descrizione disponibile."}</p>

      <Icons /> 
    </div>

    {/* // <!-- modale per la descrizione del pittore --> */}
    <div class="modal fade" id="painterModal" tabindex="-1" aria-labelledby="painterModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="painterModalLabel">{singleWork.painter.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
            </div>
            <div class="modal-body">
                <p>{ singleWork.painter.description }</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Chiudi</button>
            </div>
        </div>
    </div>
</div>
</>
  );
};



export default SingleWork;
