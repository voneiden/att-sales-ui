import React from 'react';
import { Button, IconArrowRight, IconCogwheel } from 'hds-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Label from '../common/label/Label';
import formatDateTime from '../../utils/formatDateTime';
import { getInitials } from '../../utils/getInitials';
import { Project } from '../../types';
import { ROUTES } from '../../enums';

import styles from './ProjectCard.module.scss';

const T_PATH = 'components.project.ProjectCard';

interface IProps {
  project: Project;
  showActions?: boolean;
  renderAsLink?: boolean;
  lotteryLoading?: boolean;
  lotteryOnClick?: () => void;
}

const ProjectCard = ({ project, renderAsLink, showActions, lotteryLoading, lotteryOnClick }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    application_end_time,
    estate_agent,
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

  const timeNow = new Date().getTime();
  const applicationPeriodHasEnded = application_end_time ? timeNow > new Date(application_end_time).getTime() : false;

  const renderContent = () => (
    <>
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
          <IconArrowRight className={styles.statusArrowIcon} />
          <div className={styles.stateOfProject}>
            {/* TODO: Format values for state_of_sale */}
            {state_of_sale}
          </div>
          <div>
            {applicationPeriodHasEnded ? t(`${T_PATH}.applicationTimeHasEnded`) : t(`${T_PATH}.applicationEndTime`)}
            &nbsp;
            {application_end_time ? formatDateTime(application_end_time) : '-'}
          </div>
          {showActions && (
            <div className={styles.lotteryBtnWrap}>
              <Button
                variant="primary"
                onClick={lotteryOnClick}
                disabled={!applicationPeriodHasEnded || lotteryLoading}
              >
                {t(`${T_PATH}.startLottery`)}
              </Button>
            </div>
          )}
        </div>

        <div className={styles.projectRightColumn}>
          {!renderAsLink && (
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
          )}
          <div className={styles.projectAssignee}>
            <span className={styles.assigneeCircle}>{getInitials(estate_agent)}</span>
          </div>
        </div>
      </div>
    </>
  );

  return renderAsLink ? (
    <Link to={`/${ROUTES.PROJECTS}/${uuid}`} className={styles.projectCard}>
      {renderContent()}
    </Link>
  ) : (
    <div className={styles.projectCard}>{renderContent()}</div>
  );
};

export default ProjectCard;
