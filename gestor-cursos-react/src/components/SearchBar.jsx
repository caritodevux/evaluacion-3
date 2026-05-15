const SearchBar = ({ searchTerm, onSearchChange }) => {
return (
<div className="card mb-4">
<div className="card-body">
<label htmlFor="search" className="form-label fw-bold">Buscar curso:</label>
<input
id="search"
type="text"
className="form-control"
value={searchTerm}
onChange={(event) => onSearchChange(event.target.value)}
placeholder="Ejemplo: programación, seguridad, react..."
maxLength={50}
/>
</div>
</div>
);
};
export default SearchBar;