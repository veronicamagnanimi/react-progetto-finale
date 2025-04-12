const AppFooter = () => {
  return (
    <footer className="footer text-center text-white mt-5">
      <div className="container">
        <p className="mb-1" style={{ fontSize: "1rem" }}>
          © {new Date().getFullYear()} L' Arte che Resta – Tutti i diritti
          riservati
        </p>
        <p style={{ fontSize: "0.9rem" }}>Realizzato con ❤ per l’ arte</p>
      </div>
    </footer>
  );
};

export default AppFooter;
