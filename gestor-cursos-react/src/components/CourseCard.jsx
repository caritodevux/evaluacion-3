import { sanitizeText } from "../utils/sanitize";
const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {
const safeTitle = sanitizeText(course.title);
const safeDescription = sanitizeText(course.description);
return (
<article className="card h-100 shadow-sm">
<div className="card-body">
<h5 className="card-title text-capitalize">{safeTitle}</h5>
<p className="card-text">{safeDescription}</p>
<small className="text-muted d-block mb-3">Docente ID: {course.teacherId}</small>
<button
type="button"
onClick={() => onToggleFavorite(course)}
className={isFavorite ? "btn btn-danger w-100" : "btn btn-primary w-100"}
>
{isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
</button>
</div>
</article>
);
};
export default CourseCard;