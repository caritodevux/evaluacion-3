import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {
const [courses, setCourses] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedTeacher, setSelectedTeacher] = useState("");
	const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const loadCourses = async () => {
try {
setLoading(true);
setError("");
const data = await getCourses();
setCourses(data);
} catch (error) {
setError(error.message || "Ocurrió un error inesperado.");
} finally {
setLoading(false);
}
};
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				setLoading(true);
				setError("");
				const data = await getCourses();
				if (mounted) setCourses(data);
			} catch (err) {
				if (mounted) setError(err.message || "Ocurrió un error inesperado.");
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	useEffect(() => {
		try {
			if (darkMode) {
				document.body.classList.add("dark-mode");
			} else {
				document.body.classList.remove("dark-mode");
			}
		} catch (err) {
			console.error("No se pudo aplicar el modo oscuro:", err);
		}
	}, [darkMode]);
const teacherIds = useMemo(() => {
	return Array.from(new Set(courses.map((c) => String(c.teacherId)))).sort();
}, [courses]);

const favoritesCountByTeacher = useMemo(() => {
	return favorites.reduce((acc, course) => {
		const id = String(course.teacherId);
		acc[id] = (acc[id] || 0) + 1;
		return acc;
	}, {});
}, [favorites]);

const filteredCourses = useMemo(() => {
	const normalizedSearch = searchTerm.toLowerCase().trim();
	return courses.filter((course) => {
		if (selectedTeacher && String(course.teacherId) !== selectedTeacher) {
			return false;
		}
		return course.title.toLowerCase().includes(normalizedSearch);
	});
}, [courses, searchTerm, selectedTeacher]);
const handleToggleFavorite = (course) => {
const exists = favorites.some((fav) => fav.id === course.id);
if (exists) {
const updatedFavorites = favorites.filter((fav) => fav.id !==
course.id);
setFavorites(updatedFavorites);
return;
}
setFavorites([...favorites, course]);
};
return (
<main className="container mt-5 mb-5">
	<Header darkMode={darkMode} onToggleDarkMode={setDarkMode} />
<section className="row mb-4">
<div className="col-12">
<div className="alert alert-info d-inline-block">
<strong>Total de cursos:</strong> {courses.length}
</div>
<div className="alert alert-success d-inline-block ms-2">
<strong>Favoritos:</strong> {favorites.length}
</div>
</div>
</section>
			<section className="mb-3">
				<div className="d-flex flex-wrap align-items-center gap-2">
					<button
						type="button"
						className={"btn btn-sm " + (selectedTeacher === "" ? "btn-primary" : "btn-outline-primary")}
						onClick={() => setSelectedTeacher("")}
					>
						Todos
						<span className="badge bg-light text-dark ms-2">{favorites.length}</span>
					</button>
					{teacherIds.map((id) => (
						<button
							key={id}
							type="button"
							className={"btn btn-sm " + (selectedTeacher === id ? "btn-primary" : "btn-outline-primary")}
							onClick={() => setSelectedTeacher(id)}
						>
							Docente {id}
							<span className="badge bg-light text-dark ms-2">{favoritesCountByTeacher[id] || 0}</span>
						</button>
					))}
				</div>
			</section>
			<SearchBar
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				teacherIds={teacherIds}
				selectedTeacher={selectedTeacher}
				onTeacherChange={setSelectedTeacher}
			/>
{loading && <p className="alert alert-warning mt-3">Cargando cursos...</p>}
{error && (
<div className="alert alert-danger mt-3">
<p>{error}</p>
<button type="button" className="btn btn-warning" onClick={loadCourses}>
Reintentar
</button>
</div>
)}
{!loading && !error && (
<CourseList
courses={filteredCourses}
favorites={favorites}
onToggleFavorite={handleToggleFavorite}
/>
)}
</main>
);
}
export default App;
