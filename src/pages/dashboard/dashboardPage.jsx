import React from 'react';
import useFetch from '../../hooks/useFetch';
import Project from '../../components/project/project';
import styles from './dashboardPage.module.css'

const ProjectPage = ({ token }) => {
  const { data: projects, isPending, error } = useFetch('http://localhost:4000/api/project', token);

  return (
    <div className={styles.allProjects}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {projects && projects.map(project => (
        <Project data={project} key={project._id}/>
      ))}
    </div>
  );
}

export default ProjectPage;
