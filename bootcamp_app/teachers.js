const { Pool } = require('pg');
const cohortName = process.argv[2];
const values = [`${cohortName || 'JUL02'}`];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
SELECT teachers.name as teacher, cohorts.name as cohort, COUNT(*) AS total_assistances
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`;

pool.query(query, values)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));