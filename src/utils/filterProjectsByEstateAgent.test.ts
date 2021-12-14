import { filterProjectsByEstateAgent } from './filterProjectsByEstateAgent';

const mockData = [{ estate_agent: 'john' }, { estate_agent: 'julia' }, { estate_agent: 'john' }];

describe('filterProjectsByEstateAgent', () => {
  it('should return 2 projects for john', () => {
    // @ts-ignore
    const filtered = filterProjectsByEstateAgent(mockData, 'john');
    expect(filtered).toHaveLength(2);
  });

  it('should return 1 project for julia', () => {
    // @ts-ignore
    const filtered = filterProjectsByEstateAgent(mockData, 'julia');
    expect(filtered).toHaveLength(1);
  });
});
