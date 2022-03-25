import React from 'react';
import { useTranslation } from 'react-i18next';

import InstallmentsItem from './InstallmentsItem';
import ProjectName from '../project/ProjectName';
import StatusText from '../common/statusText/StatusText';
import {
  getReservationApartmentData,
  getReservationProjectData,
  groupReservationsByProject,
} from '../../utils/mapReservationData';
import { Customer } from '../../types';
import { ApartmentReservationStates } from '../../enums';

import styles from './Installments.module.scss';

const T_PATH = 'components.installments.Installments';

interface IProps {
  customer: Customer;
}

const Installments = ({ customer }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const visibleReservations =
    customer.apartment_reservations?.filter(
      (reservation) =>
        !!reservation.apartment_installments?.length || reservation.state === ApartmentReservationStates.RESERVED
    ) || [];
  const reservationsByProject = groupReservationsByProject(visibleReservations);

  if (!reservationsByProject.length) {
    return <StatusText>{t(`${T_PATH}.noReservations`)}</StatusText>;
  }

  // Sort reservation groups alphabetically by project name
  const sortedReservationsByProject = [...reservationsByProject];
  sortedReservationsByProject.sort((a, b) => a[0].project_housing_company.localeCompare(b[0].project_housing_company));

  return (
    <>
      {sortedReservationsByProject.map((projectReservations, index) => (
        <div className={styles.singleProject} key={index}>
          <ProjectName project={getReservationProjectData(projectReservations[0])} asLink />
          {projectReservations.map((reservation) => (
            <div key={reservation.id} className={styles.singleApartment}>
              <InstallmentsItem
                apartment={getReservationApartmentData(reservation)}
                project={getReservationProjectData(reservation)}
                reservationId={reservation.id}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Installments;
