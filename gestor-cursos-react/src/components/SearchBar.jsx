const SearchBar = ({ searchTerm, onSearchChange, teacherIds = [], selectedTeacher, onTeacherChange }) => {
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

				<label htmlFor="teacherSelect" className="form-label fw-bold mt-3">Filtrar por docente:</label>
				<select
					id="teacherSelect"
					className="form-select"
					value={selectedTeacher}
					onChange={(e) => onTeacherChange(e.target.value)}
				>
					<option value="">Todos</option>
					{teacherIds.map((id) => (
						<option key={id} value={id}>Docente {id}</option>
					))}
				</select>
			</div>
		</div>
	);
};
export default SearchBar;