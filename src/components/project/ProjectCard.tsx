import React from 'react';
import { Button, IconCogwheel } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Label from '../common/label/Label';
import { formatDateTime } from '../../utils';
import { Project } from '../../types';

import styles from './ProjectCard.module.scss';

const T_PATH = 'components.project.ProjectCard';

const ProjectCard = (project: Project): JSX.Element => {
  const { t } = useTranslation();
  const {
    application_end_time,
    estimated_completion,
    district,
    housing_company,
    main_image_url,
    ownership_type,
    state_of_sale,
    street_address,
    url,
    uuid,
  } = project;

  return (
    <div className={styles.projectCard} id={uuid}>
      <div className={styles.projectDetails}>
        {main_image_url && (
          <div className={styles.projectImageColumn}>
            <img src={main_image_url} alt="" />
          </div>
        )}

        <div className={styles.projectDetailsColumn}>
          <h1 className={styles.projectName}>{housing_company}</h1>
          <div className={styles.projectLocation}>
            <strong>{district},</strong> {street_address}
          </div>
          <div className={styles.projectOwnershipType}>
            <Label type={ownership_type}>{ownership_type}</Label>
          </div>
          {estimated_completion && (
            <div className={styles.completionTime}>
              <IconCogwheel style={{ marginRight: 10 }} aria-hidden="true" /> {estimated_completion}
            </div>
          )}
        </div>
      </div>

      <div className={styles.projectActions}>
        <div className={styles.projectStatusColumn}>
          <div>
            {/* TODO: Format values for state_of_sale */}
            <strong>{state_of_sale}</strong>
          </div>
          <div>
            {t(`${T_PATH}.applicationEndTime`)} {formatDateTime(application_end_time)}
          </div>
          <div className={styles.lotteryBtnWrap}>
            {/* TODO: Add functionality for the button */}
            <Button variant="secondary" size="small" disabled>
              {t(`${T_PATH}.startLottery`)}
            </Button>
            {/* TODO: Add functionality for the button */}
            <Button variant="primary" size="small" disabled>
              {t(`${T_PATH}.downloadLotteryResults`)} (PDF)
            </Button>
          </div>
        </div>

        <div className={styles.projectRightColumn}>
          <div className={styles.projectAssignee}>
            <span className={styles.assigneeCircle}>
              {/* TODO: Get proper person's initials */}
              XY
            </span>
          </div>
          <div className={styles.projectLink}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hds-button hds-button--supplementary hds-button--small"
            >
              <span className="hds-button__label">{t(`${T_PATH}.showProject`)}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
