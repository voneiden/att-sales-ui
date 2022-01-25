import React from 'react';

import InstallmentsItem from './InstallmentsItem';
import ProjectName from '../project/ProjectName';

import styles from './Installments.module.scss';

import dummyProjects from '../../mocks/projects.json'; // TODO: Get actual project data
import dummyApartments from '../../mocks/apartments.json'; // TODO: Get actual apartment data
import dummyInstallments from '../../mocks/apartment_installments.json'; // TODO: get actual installment data

const dummyApartments1 = dummyApartments.slice(0, 2); // Get 1. and 2. for demo
const dummyApartments2 = dummyApartments.slice(2, 3); // Get 3. for demo
const dummyInstallments1 = dummyInstallments; // One that has installments
const dummyInstallments2 = [] as any; // One without installments

const Installments = () => {
  return (
    <>
      <div className={styles.singleProject}>
        <ProjectName project={dummyProjects[0] as any} />
        {!!dummyApartments1.length &&
          dummyApartments1.map((a: any) => (
            <div key={a.uuid} className={styles.singleApartment}>
              <InstallmentsItem
                apartment={a}
                installments={dummyInstallments1 as any}
                project={dummyProjects[0] as any}
              />
            </div>
          ))}
      </div>
      <div className={styles.singleProject}>
        <ProjectName project={dummyProjects[1] as any} />
        {!!dummyApartments2.length &&
          dummyApartments2.map((a: any) => (
            <div key={a.uuid} className={styles.singleApartment}>
              <InstallmentsItem
                apartment={a}
                installments={dummyInstallments2 as any}
                project={dummyProjects[1] as any}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Installments;
