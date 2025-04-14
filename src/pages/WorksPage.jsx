import { useState, useEffect } from "react";
import axios from "axios";
import WorkCard from "../components/WorkCard";
import Icons from "../components/Icons";

const WorksPage = () => {
  const [works, setWorks] = useState([]);
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchClicked, setSearchClicked] = useState(false);

  const apiLaravel = import.meta.env.VITE_API_URL;

  const loadWorks = (searchTerm = "") => {
    setSearchError("");
    setLoading(true);

    const params = {};
    if (searchTerm.length > 0) {
      params.search = searchTerm;
    }

    axios
      .get(apiLaravel, { params })
      .then((resp) => {
        setWorks(resp.data.data);
        setNoResults(resp.data.data.length === 0 && searchTerm.length > 0);
        setInitialLoad(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading works:", error);
        setWorks([]);
        setNoResults(searchTerm.length > 0);
        setInitialLoad(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWorks(""); // carica tutte le opere all'inizio
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") {
      setSearchError("Inserisci un titolo da cercare.");
      setNoResults(false);
      setSearchClicked(true); // mostra il pulsante dopo la ricerca
      return;
    }
    loadWorks(search);
    setSearchClicked(true); // mostra il pulsante dopo la ricerca
  };

  const handleResetSearch = () => {
    setSearch("");
    loadWorks(""); // carica tutte le opere
    setSearchClicked(false); // nascondi il pulsante quando resetti la ricerca
  };

  return (
    <>
      <div className="hero-img position-relative text-white text-center">
        <img
          src="/images/hero.png"
          alt="hero"
          className="img-fluid w-100 hero-banner"
        />
        <div className="hero-text position-absolute top-50 start-50 translate-middle">
          <h1>"Dipingerò i tuoi occhi quando conoscerò la tua anima"</h1>
          <h5>Amedeo Modigliani</h5>
        </div>
      </div>

      <div className="container mt-4">
        <h1 className="text-center mb-4 title-section">Quadri</h1>

        {/* Campo di ricerca */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // evita il refresh della pagina
            handleSearch(); // richiama la tua funzione di ricerca
          }}
          className="d-flex justify-content-center my-3"
        >
          <input
            className="form-control border border-secondary text-secondary w-25 m3"
            type="search"
            placeholder="Cerca un quadro o un pittore"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchError(""); // cancella eventuale errore mentre scrivi
            }}
          />
          <button className="btn btn-warning ms-2" type="submit">
            Cerca
          </button>
        </form>

        {/* Messaggio di errore */}
        {searchError && (
          <p className="text-center text-danger mt-2">{searchError}</p>
        )}

        {/* Messaggio di caricamento */}
        {loading && <p className="text-center">Caricamento in corso...</p>}

        {/* Nessun risultato trovato */}
        {!loading && noResults && !searchError && (
          <p className="text-center mt-4 text-black fw-bold">
            Nessun pittore o opera trovata.
          </p>
        )}

        {/* Card (sempre visibili) */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
          {works.map((work) => (
            <div key={work.id} className="col-md-4 mb-4">
              <WorkCard work={work} />
            </div>
          ))}
        </div>

        {/* Pulsante per vedere tutte le opere (dopo il caricamento della risposta) */}
        {!loading && searchClicked && !searchError && (
          <div className="text-center">
            <button
              className="btn btn-warning mt-3"
              onClick={handleResetSearch}
            >
              Mostra tutte le opere
            </button>
          </div>
        )}
      </div>

      <Icons />
    </>
  );
};

export default WorksPage;
