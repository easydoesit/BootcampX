SELECT day , count(*) as number_of_assignments, sum(duration) AS duration
FROM assignments
GROUP BY day
ORDER BY day;