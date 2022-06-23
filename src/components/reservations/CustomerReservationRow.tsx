import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { Button, Dialog, IconInfoCircle } from 'hds-react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import formatDateTime from '../../utils/formatDateTime';
import formattedLivingArea from '../../utils/formatLivingArea';
import Label from '../common/label/Label';
import OfferStatusText from '../offer/OfferStatusText';
import { ApartmentReservationStates } from '../../enums';
import { Customer, CustomerReservation, ReservationStateChangeUser } from '../../types';
import { mapApartmentReservationCustomerData } from '../../utils/mapApartmentReservationCustomerData';
import { getReservationApartmentData, getReservationProjectData } from '../../utils/mapReservationData';
import { showOfferModal } from '../../redux/features/offerModalSlice';
import { showReservationCancelModal } from '../../redux/features/reservationCancelModalSlice';
import { toast } from '../common/toast/ToastManager';
import { useDownloadFile } from '../../utils/useDownloadFile';
import { useFileDownloadApi } from '../../utils/useFileDownloadApi';

import styles from './CustomerReservationRow.module.scss';

const T_PATH = 'components.reservations.CustomerReservationRow';

interface IProps {
  customer: Customer;
  reservation: CustomerReservation;
}

const CustomerReservationRow = ({ customer, reservation }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const openHistoryDialogButtonRef = useRef(null);
  const apartment = getReservationApartmentData(reservation);
  const project = getReservationProjectData(reservation);
  const isCanceled = reservation.state === ApartmentReservationStates.CANCELED;
  const isInReview = reservation.state === ApartmentReservationStates.REVIEW;
  const firstInQueue = reservation.queue_position === 1;

  const closeHistoryDialog = () => setIsHistoryDialogOpen(false);

  const preContractDownloading = () => setIsLoadingContract(true);
  const postContractDownloading = () => setIsLoadingContract(false);

  const onContractLoadError = () => {
    setIsLoadingContract(false);
    toast.show({ type: 'error' });
  };

  const getContractFileName = (): string => {
    const projectName = reservation.project_housing_company.replace(/\s/g, '-').toLocaleLowerCase();
    const apartmentNumber = reservation.apartment_number.replace(/\s/g, '').toLocaleLowerCase();
    let prefix = '';

    if (reservation.project_ownership_type.toLowerCase() === 'haso') {
      prefix = 'sopimus';
    } else {
      prefix = 'kauppakirja';
    }

    // Example output: "kauppakirja_as-oy-project-x_a01_2022-01-01.pdf"
    return `${prefix}${JSON.stringify(projectName + '_' + apartmentNumber)}${new Date().toJSON().slice(0, 10)}.pdf`;
  };

  const contractApiUrl = `/apartment_reservations/${reservation.id}/contract/`;

  const {
    download,
    ref: fileRef,
    url: fileUrl,
    name: fileName,
  } = useDownloadFile({
    apiDefinition: useFileDownloadApi(contractApiUrl),
    getFileName: getContractFileName,
    onError: onContractLoadError,
    postDownloading: postContractDownloading,
    preDownloading: preContractDownloading,
  });

  const renderQueuePosition = (): JSX.Element | undefined => {
    if (!reservation.project_lottery_completed) {
      return <div>{t(`${T_PATH}.lotteryUncompleted`)}</div>;
    }
    return <div>{`${reservation.queue_position}. ` + t(`${T_PATH}.position`)}</div>;
  };

  const renderPriorityNumber = () => {
    if (reservation.priority_number !== undefined && reservation.priority_number !== null) {
      return reservation.priority_number;
    }
    return '-';
  };

  const renderHistoryTable = () => {
    if (!reservation.state_change_events) return;

    const renderUserDetails = (user?: ReservationStateChangeUser) => {
      if (user) {
        return (
          <>
            {user.first_name} {user.last_name}
            {user.email && <span>&nbsp;&ndash;&nbsp;{user.email}</span>}
          </>
        );
      }
      return '-';
    };

    return (
      <table className={cx('hds-table hds-table--dark', styles.historyTable)}>
        <thead>
          <tr className="hds-table__header-row">
            <th style={{ width: 0, paddingRight: 0 }}>#</th>
            <th>{t(`${T_PATH}.reservationState`)}</th>
            <th>{t(`${T_PATH}.timestamp`)}</th>
            <th>{t(`${T_PATH}.comment`)}</th>
            <th>{t(`${T_PATH}.user`)}</th>
          </tr>
        </thead>
        <tbody className="hds-table__content">
          {reservation.state_change_events.map((stateChangeEvent, index) => (
            <tr key={index}>
              <td className={styles.noWrap} style={{ paddingRight: 0 }}>
                {index + 1}.
              </td>
              <td className={styles.noWrap}>
                {t(`ENUMS.ApartmentReservationStates.${stateChangeEvent.state.toUpperCase()}`)}
                {isCanceled && stateChangeEvent.cancellation_reason && (
                  <span>
                    &nbsp;({t(`ENUMS.ReservationCancelReasons.${stateChangeEvent.cancellation_reason.toUpperCase()}`)})
                  </span>
                )}
              </td>
              <td>{stateChangeEvent.timestamp && formatDateTime(stateChangeEvent.timestamp)}</td>
              <td>{stateChangeEvent.comment || '-'}</td>
              <td>{renderUserDetails(stateChangeEvent.changed_by)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderCancelDetails = (): JSX.Element => {
    // Find the last state change event object with status of "canceled"
    const getLatestCancelStateEvent = reservation.state_change_events
      ?.slice()
      .reverse()
      .find((stateChangeEvent) => stateChangeEvent.state === ApartmentReservationStates.CANCELED);

    if (!getLatestCancelStateEvent || isEmpty(reservation.state_change_events)) {
      return <div className={styles.cancelText}>{t(`${T_PATH}.canceled`)}</div>;
    }

    return (
      <>
        <div className={cx(styles.cancelText, styles.noWrap)}>
          {getLatestCancelStateEvent?.state &&
            t(`ENUMS.ReservationCancelReasons.${getLatestCancelStateEvent.state.toUpperCase()}`)}
          {' - '}
          {getLatestCancelStateEvent?.timestamp && formatDateTime(getLatestCancelStateEvent.timestamp)}
        </div>
        <div className={styles.cancelText}>{getLatestCancelStateEvent?.comment}</div>
      </>
    );
  };

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
            renderCancelDetails()
          ) : (
            <>
              {renderQueuePosition()}
              <div>
                {t(`${T_PATH}.priority`)}: {renderPriorityNumber()}
              </div>
              {reservation.project_ownership_type.toLowerCase() === 'haso' && (
                <div>
                  {t(`${T_PATH}.hasoNumber`)}: {reservation.right_of_residence}
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.apartmentRowRight}>
          {reservation.offer && (
            <div className={styles.offer}>
              <OfferStatusText offer={reservation.offer} />
            </div>
          )}
          <div className={styles.historyBtn}>
            <span className={styles.tooltip} aria-hidden>
              {isEmpty(reservation.state_change_events)
                ? t(`${T_PATH}.noChangeHistory`)
                : t(`${T_PATH}.showChangeHistory`)}
            </span>
            <Button
              variant="supplementary"
              size="small"
              iconLeft={<IconInfoCircle aria-hidden />}
              disabled={isEmpty(reservation.state_change_events)}
              onClick={() => setIsHistoryDialogOpen(true)}
              ref={openHistoryDialogButtonRef}
            >
              <span className="hiddenFromScreen">{t(`${T_PATH}.changeHistory`)}</span>
            </Button>
          </div>
        </div>
      </div>
      {!isCanceled && (
        <div className={styles.buttons}>
          <div>
            {firstInQueue && (
              <>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() =>
                    dispatch(
                      showOfferModal({
                        apartment: apartment,
                        customer: mapApartmentReservationCustomerData(customer),
                        isNewOffer: !reservation.offer,
                        project: project,
                        reservation: reservation,
                      })
                    )
                  }
                >
                  {t(`${T_PATH}.offer`)}
                </Button>
                {!isInReview && (
                  <>
                    <Button variant="secondary" size="small" onClick={download} disabled={isLoadingContract}>
                      {reservation.project_ownership_type.toLowerCase() === 'haso'
                        ? t(`${T_PATH}.createContract`)
                        : t(`${T_PATH}.createDeedOfSale`)}
                    </Button>
                    <a href={fileUrl} download={fileName} className="hiddenFromScreen" ref={fileRef}>
                      {t(`${T_PATH}.download`)}
                    </a>
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <Button
              variant="supplementary"
              size="small"
              iconLeft={''}
              className={styles.cancelBtn}
              onClick={() =>
                dispatch(
                  showReservationCancelModal({
                    ownershipType: project.ownership_type,
                    projectId: project.uuid,
                    reservationId: reservation.id,
                    customer: mapApartmentReservationCustomerData(customer),
                  })
                )
              }
            >
              {t(`${T_PATH}.btnCancel`)}
            </Button>
          </div>
        </div>
      )}
      {!isEmpty(reservation.state_change_events) && (
        <Dialog
          id={`history-dialog-${reservation.id}`}
          aria-labelledby="history-dialog-header"
          isOpen={isHistoryDialogOpen}
          close={closeHistoryDialog}
          closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
          className={styles.historyDialog}
          focusAfterCloseRef={openHistoryDialogButtonRef}
        >
          <Dialog.Header id="history-dialog-header" title={t(`${T_PATH}.changeHistory`)} />
          <Dialog.Content>
            <div className={styles.dialogTitle}>
              <Label type={project.ownership_type}>{project.ownership_type}</Label>
              <span>{project.housing_company}</span>
              <span>&ndash;</span>
              <span>{apartment.apartment_number}</span>
            </div>
            {renderHistoryTable()}
          </Dialog.Content>
          <Dialog.ActionButtons>
            <Button variant="secondary" onClick={() => closeHistoryDialog()}>
              {t(`${T_PATH}.close`)}
            </Button>
          </Dialog.ActionButtons>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerReservationRow;
