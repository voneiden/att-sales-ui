import React from 'react';
import cx from 'classnames';
import { Button, IconAngleDown, IconAngleRight, IconArrowRight } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import ProjectName from '../project/ProjectName';
import formattedLivingArea from '../../utils/formatLivingArea';
import StatusText from '../common/statusText/StatusText';
import useSessionStorage from '../../utils/useSessionStorage';
import {
  groupReservationsByProject,
  getReservationApartmentData,
  getReservationProjectData,
} from '../../utils/mapReservationData';
import { Customer, CustomerReservation } from '../../types';
import { showOfferModal } from '../../redux/features/offerModalSlice';

import styles from './CustomerReservations.module.scss';
import { ApartmentReservationStates } from '../../enums';

const T_PATH = 'components.customers.CustomerReservations';

interface CustomerReservationsProps {
  customer: Customer;
}

interface ReservationsByProjectProps {
  customer: Customer;
  reservations: CustomerReservation[];
}

const CustomerReservations = ({ customer }: CustomerReservationsProps): JSX.Element => {
  const { t } = useTranslation();
  const reservationsByProject = groupReservationsByProject(customer.apartment_reservations || []);

  if (!reservationsByProject.length) {
    return (
      <div className={styles.singleProject}>
        <StatusText>{t(`${T_PATH}.noReservations`)}</StatusText>
      </div>
    );
  }

  // Sort reservation groups alphabetically by project name
  const sortedReservationsByProject = [...reservationsByProject];
  sortedReservationsByProject.sort((a, b) => a[0].project_housing_company.localeCompare(b[0].project_housing_company));

  return (
    <>
      {sortedReservationsByProject.map((projectReservations, index) => (
        <ReservationsByProject key={index} customer={customer} reservations={projectReservations} />
      ))}
    </>
  );
};

export const ReservationsByProject = ({ customer, reservations }: ReservationsByProjectProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [projectOpen, setProjectOpen] = useSessionStorage({
    defaultValue: false,
    key: `reservationProjectRowOpen-${reservations[0].project_uuid}`,
  });
  const toggleProject = () => setProjectOpen(!projectOpen);

  // Sort reservations by queue position
  const sortedReservations = [...reservations];
  sortedReservations.sort((a, b) => a.queue_position - b.queue_position);

  const renderApartmentRow = (reservation: CustomerReservation) => {
    const apartment = getReservationApartmentData(reservation);
    const project = getReservationProjectData(reservation);
    const isCanceled = reservation.state === ApartmentReservationStates.CANCELED;

    return (
      <div className={styles.row}>
        <div className={cx(styles.apartmentRow, isCanceled && styles.disabledRow)}>
          <div className={styles.apartmentRowLeft}>
            <div className={styles.apartmentStructure}>
              <span className={styles.emphasized}>{apartment.apartment_number}</span>
              <span>
                {apartment.apartment_structure} ({formattedLivingArea(apartment.living_area)})
              </span>
            </div>
            {isCanceled ? (
              // TODO: Add cancellation reason and cancel dates
              <div>{t(`${T_PATH}.canceled`)}</div>
            ) : (
              <>
                <div>
                  {reservation.lottery_position === null
                    ? t(`${T_PATH}.lotteryUncompleted`)
                    : reservation.queue_position + '. ' + t(`${T_PATH}.position`)}
                </div>
                <div>{t(`${T_PATH}.priority`)}: TODO</div>
              </>
            )}
          </div>
          <div className={styles.apartmentRowRight}>
            {!isCanceled && (
              <div className={styles.offer}>
                <span className={styles.offerTitle}>{t(`${T_PATH}.offerDueDate`)}</span>{' '}
                <IconArrowRight className={styles.offerArrowIcon} size="xs" aria-hidden /> <span>TODO</span>
              </div>
            )}
          </div>
        </div>
        {!isCanceled && reservation.queue_position === 1 && (
          <div className={styles.buttons}>
            <Button
              variant="secondary"
              size="small"
              onClick={() =>
                dispatch(
                  showOfferModal({
                    project: project,
                    apartment: apartment,
                    customer: customer,
                  })
                )
              }
            >
              {t(`${T_PATH}.createOffer`)}
            </Button>
            <Button variant="secondary" size="small" disabled>
              {t(`${T_PATH}.createContract`)}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cx(styles.singleProject, projectOpen && styles.open)}>
      <div className={styles.projectRow}>
        <ProjectName project={getReservationProjectData(sortedReservations[0])} asLink />
        <Button
          variant="secondary"
          theme="black"
          className={styles.accordionButton}
          onClick={toggleProject}
          iconLeft={projectOpen ? <IconAngleDown /> : <IconAngleRight />}
        >
          <span />
        </Button>
      </div>
      {projectOpen &&
        sortedReservations.map((reservation) => (
          <div key={reservation.id} className={styles.singleApartment}>
            {renderApartmentRow(reservation)}
          </div>
        ))}
    </div>
  );
};

export default CustomerReservations;
