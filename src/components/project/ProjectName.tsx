import React from 'react';

import Label from '../common/label/Label';

import { Project } from '../../types';

import styles from './ProjectName.module.scss';

interface IProps {
  project?: Project;
}

const ProjectName = ({ project }: IProps): JSX.Element | null => {
  if (!project) {
    return null;
  }

  return (
    <div className={styles.projectName}>
      <div className={styles.labelWrapper}>
        <Label type={project.ownership_type}>{project.ownership_type}</Label>
      </div>
      <h2>{project.housing_company}</h2>
      <div>
        <strong>{project.district},</strong> {project.street_address}
      </div>
    </div>
  );
};

export default ProjectName;
