export const sanitizeText = (text) => {
if (typeof text !== "string") return "";
return text
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.trim();
};