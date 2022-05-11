import React, { useState } from 'react';
import axios from 'axios';
import { Button, IconDownload } from 'hds-react';
import { useTranslation } from 'react-i18next';

import getApiBaseUrl from '../../utils/getApiBaseUrl';
import { Project } from '../../types';
import { useDownloadFile } from '../../utils/useDownloadFile';
import { toast } from '../common/toast/ToastManager';

import styles from './ProjectActions.module.scss';

const T_PATH = 'components.project.ProjectActions';

interface ProjectActionsProps {
  project: Project;
}

interface DownloadApplicantsListButtonProps {
  housingCompany: Project['housing_company'];
  projectUuid: Project['uuid'];
}

const DownloadApplicantsListButton = ({
  housingCompany,
  projectUuid,
}: DownloadApplicantsListButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const [isLoadingApplicantsList, setIsLoadingApplicantsList] = useState<boolean>(false);

  const preApplicantListDownloading = () => setIsLoadingApplicantsList(true);
  const postApplicantListDownloading = () => setIsLoadingApplicantsList(false);

  const onApplicantListLoadError = () => {
    setIsLoadingApplicantsList(false);
    toast.show({ type: 'error' });
  };

  const getApplicantListFileName = (): string => {
    const projectName = housingCompany.replace(/\s/g, '-').toLocaleLowerCase();
    const prefix = 'hakijalista';
    const fileFormat = 'csv';

    // Example output: "hakijalista_as-oy-project-x_2022-01-01.pdf"
    return `${prefix}${JSON.stringify(projectName)}${new Date().toJSON().slice(0, 10)}.${fileFormat}`;
  };

  const downloadApplicantList = () => {
    const apiBaseUrl = getApiBaseUrl();

    return axios.get(`${apiBaseUrl}/projects/${projectUuid}/export_applicants/`, {
      responseType: 'blob',
      // TODO: auth token in headers
      // headers: {
      //   Authorization: `Bearer ${apiToken}`,
      // }
    });
  };

  const {
    download,
    ref: fileRef,
    url: fileUrl,
    name: fileName,
  } = useDownloadFile({
    apiDefinition: downloadApplicantList,
    getFileName: getApplicantListFileName,
    onError: onApplicantListLoadError,
    postDownloading: postApplicantListDownloading,
    preDownloading: preApplicantListDownloading,
  });

  return (
    <>
      <Button
        variant="secondary"
        iconRight={<IconDownload />}
        theme="black"
        onClick={download}
        disabled={isLoadingApplicantsList}
      >
        {t(`${T_PATH}.downloadApplicantList`)}
      </Button>
      <a href={fileUrl} download={fileName} className="hiddenFromScreen" ref={fileRef}>
        {t(`${T_PATH}.download`)}
      </a>
    </>
  );
};

const ProjectActions = ({ project }: ProjectActionsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <span className={styles.action}>
        <DownloadApplicantsListButton housingCompany={project.housing_company} projectUuid={project.uuid} />
      </span>
      {/* TODO: add functionality for this button */}
      {project.lottery_completed && (
        <span className={styles.action}>
          <Button variant="primary" iconRight={<IconDownload />} theme="black" disabled>
            {t(`${T_PATH}.downloadLotteryResults`)}
          </Button>
        </span>
      )}
    </div>
  );
};

export default ProjectActions;
