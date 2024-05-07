import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTeamService } from './project-team.service';

describe('ProjectTeamService', () => {
  let service: ProjectTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTeamService],
    }).compile();

    service = module.get<ProjectTeamService>(ProjectTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
