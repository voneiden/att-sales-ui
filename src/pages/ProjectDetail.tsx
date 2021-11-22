import React from 'react';

import Container from '../components/common/container/Container';
import ProjectCard from '../components/project/ProjectCard';
import { Project, StateOfSale } from '../types';

// TODO: Remove when we get actual data from API
const exampleProjectData = {
  application_end_time: '2021-12-01T10:00:00+02:00',
  estimated_completion: 'Valmistuu 06-08/2020',
  district: 'Karhusaari',
  housing_company: 'As Oy Helsingin Lohenpoika',
  main_image_url: 'https://nginx-asuntotuotanto-test.agw.arodevtest.hel.fi/sites/default/files/2021-08/room_6.jpeg',
  ownership_type: 'Hitas',
  state_of_sale: StateOfSale.ForSale,
  street_address: 'Karhutorpantie 13',
  url: 'https://nginx-asuntotuotanto-test.agw.arodevtest.hel.fi/fi/node/17',
  uuid: '698a8e01-71f4-4507-b07a-bb93d4aa0113',
} as Project;

const ProjectDetail = (): JSX.Element => {
  return (
    <Container wide>
      <ProjectCard {...exampleProjectData} />
    </Container>
    /* TODO: Display apartment list here */
  );
};

export default ProjectDetail;
