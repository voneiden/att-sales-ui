import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ApartmentActions from '../components/apartment/ApartmentActions';
import ApartmentTable from '../components/apartment/ApartmentTable';
import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import { useGetProjectByIdQuery } from '../redux/services/api';

const T_PATH = 'pages.ProjectDetail';

const ProjectDetail = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { data: project, isLoading, isError, isSuccess } = useGetProjectByIdQuery(projectId || '');

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError) {
    return <Container>Error while loading the project</Container>;
  }

  return (
    <>
      <Container wide>{isSuccess && project && <ProjectCard project={project} />}</Container>
      <Container>
        <h2>{t(`${T_PATH}.projectApartments`)}</h2>
        <ApartmentActions />
        {isSuccess && project && <ApartmentTable projectId={project.id} housingCompany={project.housing_company} />}
      </Container>
    </>
  );
};

export default ProjectDetail;
