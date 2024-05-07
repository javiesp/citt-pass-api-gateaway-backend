import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTeamController } from './project-team.controller';
import { ProjectTeamService } from './project-team.service';

describe('ProjectTeamController', () => {
  let controller: ProjectTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTeamController],
      providers: [ProjectTeamService],
    }).compile();

    controller = module.get<ProjectTeamController>(ProjectTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
