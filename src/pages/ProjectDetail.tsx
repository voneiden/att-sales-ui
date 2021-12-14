import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';

import ApartmentActions from '../components/apartment/ApartmentActions';
import ApartmentTable from '../components/apartment/ApartmentTable';
import Breadcrumbs, { BreadcrumbItem } from '../components/common/breadcrumbs/Breadcrumbs';
import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import StatusText from '../components/common/statusText/StatusText';
import { useGetApartmentsByProjectQuery, useGetProjectByIdQuery } from '../redux/services/api';
import { ROUTES } from '../enums';

import styles from './ProjectDetail.module.scss';

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

  const breadcrumbAncestors: BreadcrumbItem[] = [
    {
      label: t(`${T_PATH}.projects`),
      path: `/${ROUTES.PROJECTS}`,
    },
  ];

  if (isLoading) {
    return (
      <Container>
        <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Notification type="error" size="small" style={{ marginTop: 15 }}>
          {t(`${T_PATH}.errorLoadingProject`)}
        </Notification>
      </Container>
    );
  }

  if (!isSuccess || !project) return null;

  return (
    <>
      <Container>
        <Breadcrumbs current={project.housing_company} ancestors={breadcrumbAncestors} />
      </Container>
      <Container wide>
        <ProjectCard project={project} showActions />
        <div className={styles.apartmentsWrapper}>
          <ApartmentActions />
          <ApartmentTable
            apartments={apartments}
            isLoading={isApartmentsLoading}
            isError={isApartmentsError}
            isSuccess={isApartmentsSuccess}
            projectId={project.id}
            housingCompany={project.housing_company}
          />
        </div>
      </Container>
    </>
  );
};

export default ProjectDetail;
