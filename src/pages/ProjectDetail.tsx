import React from 'react';
import { useParams } from 'react-router-dom';

import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import { useGetProjectByIdQuery } from '../redux/services/projectApi';

const ProjectDetail = (): JSX.Element | null => {
  const { projectId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetProjectByIdQuery(projectId || '');

  return (
    <Container wide>
      <>
        {isLoading
          ? 'Loading...'
          : isError
          ? 'Error while loading the project'
          : isSuccess && data && <ProjectCard project={data} />}
      </>
    </Container>
    /* TODO: Display apartment list here */
  );
};

export default ProjectDetail;
