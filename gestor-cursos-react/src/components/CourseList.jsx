import PropTypes from "prop-types";
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

CourseList.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			teacherId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		})
	).isRequired,
	favorites: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			teacherId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		})
	).isRequired,
	onToggleFavorite: PropTypes.func.isRequired,
};