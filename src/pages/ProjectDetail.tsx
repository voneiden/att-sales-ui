import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ApartmentActions from '../components/apartment/ApartmentActions';
import ApartmentTable from '../components/apartment/ApartmentTable';
import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import { useGetApartmentsByProjectQuery, useGetProjectByIdQuery } from '../redux/services/api';

const T_PATH = 'pages.ProjectDetail';

const ProjectDetail = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { data: project, isLoading, isError, isSuccess } = useGetProjectByIdQuery(projectId || '0');
  const {
    data: apartments,
    isLoading: isApartmentsLoading,
    isError: isApartmentsError,
    isSuccess: isApartmentsSuccess,
  } = useGetApartmentsByProjectQuery(projectId || '0', { skip: !isSuccess });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError) {
    return <Container>Error while loading the project</Container>;
  }

  if (!isSuccess || !project) return null;

  return (
    <>
      <Container wide>
        <ProjectCard project={project} />
      </Container>
      <Container>
        <h2>{t(`${T_PATH}.projectApartments`)}</h2>
        <ApartmentActions />
        <ApartmentTable
          apartments={apartments}
          isLoading={isApartmentsLoading}
          isError={isApartmentsError}
          isSuccess={isApartmentsSuccess}
          projectId={project.id}
          housingCompany={project.housing_company}
        />
      </Container>
    </>
  );
};

export default ProjectDetail;
