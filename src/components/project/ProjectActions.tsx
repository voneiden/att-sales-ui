import React from 'react';
import { Button, IconDownload } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Project } from '../../types';

import styles from './ProjectActions.module.scss';

const T_PATH = 'components.project.ProjectActions';

interface IProps {
  lotteryCompleted: Project['lottery_completed'];
}

const ProjectActions = ({ lotteryCompleted }: IProps): JSX.Element => {
  const { t } = useTranslation();

  if (lotteryCompleted) {
    return (
      <div>
        <span className={styles.action}>
          <Button variant="primary" iconRight={<IconDownload />} theme="black">
            {t(`${T_PATH}.createBuyerMailingList`)}
          </Button>
        </span>
        <span className={styles.action}>
          <Button variant="primary" iconRight={<IconDownload />} theme="black">
            {t(`${T_PATH}.downloadLotteryResults`)}
          </Button>
        </span>
      </div>
    );
  }

  return (
    <div>
      <span className={styles.action}>
        <Button variant="secondary" iconRight={<IconDownload />} theme="black">
          {t(`${T_PATH}.downloadApplicantList`)}
        </Button>
      </span>
    </div>
  );
};

export default ProjectActions;
