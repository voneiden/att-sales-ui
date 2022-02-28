import React from 'react';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Notification, Tabs } from 'hds-react';

import ApartmentActions from '../components/apartment/ApartmentActions';
import ApartmentTable from '../components/apartment/ApartmentTable';
import Breadcrumbs, { BreadcrumbItem } from '../components/common/breadcrumbs/Breadcrumbs';
import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import ProjectInstallments from '../components/installments/ProjectInstallments';
import StatusText from '../components/common/statusText/StatusText';
import { toast } from '../components/common/toast/ToastManager';
import { useGetProjectByIdQuery, useStartLotteryForProjectMutation } from '../redux/services/api';
import { ROUTES } from '../enums';

import styles from './ProjectDetail.module.scss';

const T_PATH = 'pages.ProjectDetail';

const ProjectDetail = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isFetching,
    refetch,
    isError,
    isSuccess,
  } = useGetProjectByIdQuery(projectId || '0');
  const [startLotteryForProject, { isLoading: startLotterIsLoading }] = useStartLotteryForProjectMutation();

  const onStartLotteryClick = async () => {
    if (!startLotterIsLoading) {
      try {
        await startLotteryForProject({ project_uuid: project?.uuid })
          .unwrap()
          .then(() => {
            // Show success toast
            toast.show({ type: 'success' });
            // Refetch project data after form was successfully submitted
            refetch();
          });
      } catch (err) {
        console.error('Failed to post: ', err);
      }
    }
  };

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
      <Container wide className={cx(isFetching && styles.disabled)}>
        <ProjectCard
          project={project}
          showActions
          lotteryOnClick={() => onStartLotteryClick()}
          lotteryLoading={startLotterIsLoading}
        />
        <Tabs>
          <Tabs.TabList className={styles.tabList}>
            <Tabs.Tab>{t(`${T_PATH}.apartments`)}</Tabs.Tab>
            <Tabs.Tab>{t(`${T_PATH}.installments`)}</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanel>
            <div className={styles.apartmentsWrapper}>
              <ApartmentActions lotteryCompleted={project.lottery_completed} />
              <ApartmentTable
                apartments={project.apartments}
                ownershipType={project.ownership_type.toLowerCase()}
                projectId={project.id}
                housingCompany={project.housing_company}
              />
            </div>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <div className={styles.installmentsWrapper}>
              <ProjectInstallments
                uuid={project.uuid}
                barred_bank_account={project.barred_bank_account}
                regular_bank_account={project.regular_bank_account}
              />
            </div>
          </Tabs.TabPanel>
        </Tabs>
      </Container>
    </>
  );
};

export default ProjectDetail;
