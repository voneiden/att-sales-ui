import React from 'react';
import { IconArrowRight, Notification, TextArea } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Spinner from '../common/spinner/Spinner';
import { OfferModalReservationData } from '../../types';
import { useGetOfferMessageQuery } from '../../redux/services/api';

import styles from './OfferEmailMessage.module.scss';

const T_PATH = 'components.offer.OfferEmailMessage';

interface IProps {
  reservationId: OfferModalReservationData['id'];
}

const OfferEmailMessage = ({ reservationId }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetOfferMessageQuery(reservationId);

  if (isLoading) return <Spinner />;

  if (isError || !data) {
    return (
      <Notification type="error" size="small" style={{ marginTop: 15 }}>
        {t(`${T_PATH}.errorLoadingEmailMessage`)}
      </Notification>
    );
  }

  const encodedRecipients = () => {
    const emails = data.recipients.map((recipient) => encodeURIComponent(recipient.email));
    return emails.join(',');
  };

  const email = {
    to: encodedRecipients(),
    subject: encodeURIComponent(data.subject),
    body: encodeURIComponent(data.body),
  };

  const mailtoLink = `mailto:${email.to}?subject=${email.subject}&body=${email.body}`;

  return (
    <>
      <div className={styles.textarea}>
        <TextArea id="offerMessage" label={t(`${T_PATH}.offerIntroLabel`)} disabled value={data.body} />
      </div>
      <div>
        <a
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.link} hds-button hds-button--supplementary`}
        >
          <div className="Button-module_icon" style={{ marginLeft: 'var(--spacing-s)' }}>
            <IconArrowRight aria-hidden />
          </div>
          <span className="hds-button__label">{t(`${T_PATH}.openInEmailApp`)}</span>
        </a>
      </div>
    </>
  );
};

export default OfferEmailMessage;
