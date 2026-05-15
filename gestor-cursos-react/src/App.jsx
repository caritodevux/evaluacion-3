import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {
const [courses, setCourses] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [favorites, setFavorites] = useLocalStorage("favoriteCourses",
[]);
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
loadCourses();
}, []);
const filteredCourses = useMemo(() => {
const normalizedSearch = searchTerm.toLowerCase().trim();
return courses.filter((course) =>
course.title.toLowerCase().includes(normalizedSearch)
);
}, [courses, searchTerm]);
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
<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
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
