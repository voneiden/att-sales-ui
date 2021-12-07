import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../components/common/container/Container';
import { useGetProjectsQuery } from '../redux/services/api';
import { ROUTES } from '../enums';

const Index = (): JSX.Element => {
  const { data: projects, isLoading, isError, isSuccess } = useGetProjectsQuery();

  return (
    <Container>
      <h1>Homepage</h1>
      <h2>Projects</h2>
      {isLoading
        ? 'Loading...'
        : isError
        ? 'Error while loading projects'
        : isSuccess &&
          projects && (
            <>
              {projects.map((project) => (
                <p key={project.uuid}>
                  <Link to={`${ROUTES.PROJECT}/${project.id}`}>{project.housing_company}</Link>
                </p>
              ))}
            </>
          )}
    </Container>
  );
};

export default Index;
