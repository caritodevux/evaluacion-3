import CourseCard from "./CourseCard";
const CourseList = ({ courses, favorites, onToggleFavorite }) => {
if (courses.length === 0) {
return <p className="alert alert-info mt-3">No se encontraron cursos.</p>;
}
return (
<section className="row mt-4">
{courses.map((course) => {
const isFavorite = favorites.some((fav) => fav.id === course.id);
return (
<div key={course.id} className="col-12 col-md-6 col-lg-4 mb-4">
<CourseCard
course={course}
isFavorite={isFavorite}
onToggleFavorite={onToggleFavorite}
/>
</div>
);
})}
</section>
);
};

export default CourseList;