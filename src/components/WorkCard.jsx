import { Link } from 'react-router-dom';

const WorkCard = ({ work }) => {
    const backendImg = import.meta.env.VITE_IMG_URL;
    const imageUrl = work.image
      ? `${backendImg}/storage/${work.image}`
      : `${backendImg}/images/default.jpg`;
  
    return (
      <div className="card h-100 shadow-sm">
        <img
          src={imageUrl}
          alt={work.name || 'Immagine non disponibile'}
          className="card-img-top card-image"
          onError={(e) => {
            e.target.src = `${backendImg}/images/default.jpg`;
          }}
        />
        <div className="card-body text-center">
          <h2 className="card-title">{work.name}</h2>
          <p className="card-text"><strong>Pittore:</strong> {work.painter.name}</p>
          <p className="card-text"><strong>Anno:</strong> {work.year}</p>
          <p className="card-text"><strong>Luogo:</strong> {work.location}</p>
          <Link to={`/${work.id}`} className="btn btn-warning btn-sm">Dettagli</Link>
        </div>
      </div>
    );
  };
  
  export default WorkCard;
  