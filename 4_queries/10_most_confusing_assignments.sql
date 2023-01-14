SELECT assignments.id AS id, assignments.name AS name, assignments.chapter AS chapter, COUNT(assistance_requests.*) as total_requests
FROM assistance_requests
JOIN assignments ON assignment_id = assignments.id
GROUP BY assignments.id, name, chapter
ORDER BY total_requests DESC;
