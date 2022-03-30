import React from 'react';
import { Controller, useForm, SubmitHandler, get } from 'react-hook-form';
import { omit } from 'lodash';
import { Select, TextArea } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ApartmentReservationWithCustomer, Project, ReservationCancelFormData, SelectOption } from '../../types';
import { ReservationCancelReasons } from '../../enums';

const T_PATH = 'components.reservations.ReservationCancelForm';

interface IProps {
  reservation: ApartmentReservationWithCustomer;
  ownershipType: Project['ownership_type'];
  handleFormCallback: (data: ReservationCancelFormData) => void;
}

const ReservationCancelForm = ({ reservation, ownershipType, handleFormCallback }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const schema = yup.object({
    reason: yup.string().required(t(`${T_PATH}.reasonRequired`)),
    transfer_to_customer: yup
      .string()
      .when('reason', {
        is: ReservationCancelReasons.TRANSFERRED,
        then: yup.string().required(t(`${T_PATH}.customerRequired`)),
      })
      .nullable(),
    comment: yup.string().nullable(),
  });
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservationCancelFormData>({
    resolver: yupResolver(schema),
  });

  const isTransferred = watch('reason') === ReservationCancelReasons.TRANSFERRED ? true : false;

  const onSubmit: SubmitHandler<ReservationCancelFormData> = (data, event) => {
    event?.preventDefault();
    const formData = { ...data };

    // If cancellation reason is not "transferred", remove "transfer_to_customer" field from api data
    const apiData = !isTransferred ? omit(formData, 'transfer_to_customer') : formData;

    handleFormCallback(apiData);
  };

  const reasonOptions = (): SelectOption[] => {
    const options: SelectOption[] = [];

    Object.entries(ReservationCancelReasons).forEach((reason) => {
      const enumName = reason[0];
      const enumValue = reason[1];

      // Disable "transferred" option from Hitas and Puolihitas apartments
      if (enumValue === ReservationCancelReasons.TRANSFERRED && ownershipType.toLowerCase() !== 'haso') {
        return null;
      }

      return options.push({
        label: t(`ENUMS.${enumName}`),
        name: 'reason',
        selectValue: enumValue,
      });
    });

    return options;
  };

  const getReasonOption = (value: string) => {
    if (value === '') return null;
    return reasonOptions().find((option) => option.selectValue === value);
  };

  return (
    <form id={`reservation-cancel-form-${reservation.id}`} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="reason"
        control={control}
        render={({ field }) => (
          <Select
            id="reason"
            label={t(`${T_PATH}.reason`)}
            placeholder={t(`${T_PATH}.reason`)}
            required
            isOptionDisabled={(item: SelectOption): boolean => !!item.disabled}
            invalid={Boolean(get(errors, 'reason'))}
            error={get(errors, 'reason')?.message}
            options={reasonOptions()}
            value={getReasonOption(field.value || '')}
            onChange={(selected: SelectOption) => {
              setValue('reason', selected.selectValue);
            }}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      {isTransferred && (
        <Controller
          name="transfer_to_customer"
          control={control}
          render={({ field }) => (
            <Select
              id="transferToCustomer"
              label={t(`${T_PATH}.transferToCustomer`)}
              placeholder="TODO"
              required
              invalid={Boolean(get(errors, 'transfer_to_customer'))}
              error={get(errors, 'transfer_to_customer')?.message}
              options={[]}
              style={{ marginBottom: '1rem' }}
              helper={t(`${T_PATH}.transferToCustomerHelpText`)}
            />
          )}
        />
      )}
      <TextArea
        id="additionalInfo"
        label={t(`${T_PATH}.additionalInfo`)}
        invalid={Boolean(errors.comment)}
        errorText={errors.comment?.message}
        autoComplete="off"
        {...register('comment')}
      />
    </form>
  );
};

export default ReservationCancelForm;
