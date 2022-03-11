import i18n from '../i18n/i18n';
import { Project } from '../types';

const T_PATH = 'utils.getProjectState';

export const getProjectState = (project: Project): string => {
  let state = i18n.t(`ENUMS.${project.state_of_sale}`);

  if (project.archived) {
    // Example: "Ready (Archived)"
    state = i18n.t(`ENUMS.${project.state_of_sale}`) + ' (' + i18n.t(`${T_PATH}.archived`) + ')';
  }

  if (!project.published) {
    // Example: "Upcoming (Unpublished)"
    state = i18n.t(`ENUMS.${project.state_of_sale}`) + ' (' + i18n.t(`${T_PATH}.unpublished`) + ')';
  }

  return state;
};
