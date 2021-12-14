import React from 'react';
import {
  Button,
  IconGroup,
  IconPlus,
  IconUser,
  Koros,
  Notification,
  SearchInput,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from 'hds-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import StatusText from '../components/common/statusText/StatusText';
import useLocalStorage from '../utils/useLocalStorage';
import { filterProjectsByEstateAgent } from '../utils/filterProjectsByEstateAgent';
import { groupProjectsByState } from '../utils/groupProjectsByState';
import { RootState } from '../redux/store';
import { useGetProjectsQuery } from '../redux/services/api';

import styles from './Homepage.module.scss';

const T_PATH = 'pages.Homepage';

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const [showMyProjects, setShowMyProjects] = useLocalStorage({ defaultValue: true, key: `showMyProjects` });
  const { data: projects, isLoading, isError, isSuccess } = useGetProjectsQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const userFullName = user ? (user.name as string) : '';

  const renderToolbar = () => {
    return (
      <Container className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.toolbarButtons}>
            <Button
              variant={showMyProjects ? 'primary' : 'secondary'}
              iconLeft={<IconUser />}
              onClick={() => setShowMyProjects(true)}
            >
              {t(`${T_PATH}.btnMyProjects`)}
            </Button>
            <Button
              variant={showMyProjects ? 'secondary' : 'primary'}
              iconLeft={<IconGroup />}
              onClick={() => setShowMyProjects(false)}
            >
              {t(`${T_PATH}.btnAllProjects`)}
            </Button>
          </div>
          <div className={styles.toolbarSearch}>
            <SearchInput
              label={t(`${T_PATH}.searchLabel`)}
              searchButtonAriaLabel={t(`${T_PATH}.searchbtnAriaLabel`)}
              clearButtonAriaLabel={t(`${T_PATH}.searchClearBtnLabel`)}
              onSubmit={() => null}
            />
          </div>
        </div>
        <div className={styles.toolbarRight}>
          <a href="#todo" className="hds-button hds-button--primary">
            <span aria-hidden="true" className="hds-icon">
              <IconPlus />
            </span>
            <span className="hds-button__label">{t(`${T_PATH}.btnAddProject`)}</span>
          </a>
        </div>
      </Container>
    );
  };

  const renderProjects = () => {
    if (projects === undefined) {
      return (
        <Container>
          <p className={styles.statusText}>{t(`${T_PATH}.noProjects`)}</p>
        </Container>
      );
    }

    let visibleProjects = projects;

    if (showMyProjects) {
      visibleProjects = filterProjectsByEstateAgent(projects, userFullName);
    }

    if (!visibleProjects.length) {
      return (
        <Container>
          <StatusText>{t(`${T_PATH}.noAssignedProjects`)}</StatusText>
        </Container>
      );
    }

    const { UPCOMING: upcoming, FOR_SALE: forSale } = groupProjectsByState(visibleProjects);

    const upcomingCount = upcoming ? upcoming.length : 0;
    const forSaleCount = forSale ? forSale.length : 0;

    return (
      <Container wide>
        <Tabs>
          <TabList className={styles.tabLinks} style={{ marginBottom: 'var(--spacing-m)' }}>
            <Tab>
              {t(`${T_PATH}.tabPublished`)} ({forSaleCount})
            </Tab>
            <Tab>
              {t(`${T_PATH}.tabUpcoming`)} ({upcomingCount})
            </Tab>
            <Tab>{t(`${T_PATH}.tabUnpublished`)} (0)</Tab>
            <Tab>{t(`${T_PATH}.tabArchived`)} (0)</Tab>
          </TabList>
          <TabPanel>
            {forSale &&
              forSale.map((project) => (
                <div key={project.uuid} className={styles.singleProject}>
                  <ProjectCard project={project} renderAsLink />
                </div>
              ))}
          </TabPanel>
          <TabPanel>
            {upcoming &&
              upcoming.map((project) => (
                <div key={project.uuid} className={styles.singleProject}>
                  <ProjectCard project={project} renderAsLink />
                </div>
              ))}
          </TabPanel>
          <TabPanel>Unpublished: TODO</TabPanel>
          <TabPanel>Archived: TODO</TabPanel>
        </Tabs>
      </Container>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <Container>
          <h1>{t(`${T_PATH}.pageTitle`)}</h1>
        </Container>
      </header>
      <Koros type="pulse" flipHorizontal style={{ fill: 'var(--color-engel)' }} />
      {renderToolbar()}
      {isLoading ? (
        <Container>
          <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>
        </Container>
      ) : isError ? (
        <Container>
          <Notification label={t(`${T_PATH}.errorTitle`)} type="error">
            {t(`${T_PATH}.errorLoadingProjects`)}
          </Notification>
        </Container>
      ) : (
        isSuccess && renderProjects()
      )}
    </>
  );
};

export default Index;
