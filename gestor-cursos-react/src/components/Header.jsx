import PropTypes from "prop-types";

const Header = ({ darkMode, onToggleDarkMode }) => {
	return (
		<header className="mb-4">
			<div className={darkMode ? "bg-dark text-white p-4 rounded" : "bg-light text-dark p-4 rounded"}>
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<h1 className="mb-2">Gestor de Cursos React</h1>
						<p className="mb-0">SPA con API, LocalStorage, componentes y buenas prácticas de seguridad.</p>
					</div>
					<div className="form-check form-switch">
						<input
							className="form-check-input"
							type="checkbox"
							id="darkModeSwitch"
							checked={darkMode}
							onChange={(e) => onToggleDarkMode(e.target.checked)}
						/>
						<label className="form-check-label ms-2" htmlFor="darkModeSwitch">Modo oscuro</label>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;

Header.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	onToggleDarkMode: PropTypes.func.isRequired,
};