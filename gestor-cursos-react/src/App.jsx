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
const teacherIds = useMemo(() => {
	return Array.from(new Set(courses.map((c) => String(c.teacherId)))).sort();
}, [courses]);

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
<Header />
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
