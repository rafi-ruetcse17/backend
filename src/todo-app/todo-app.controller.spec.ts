import { Test, TestingModule } from '@nestjs/testing';
import { ToDoAppController } from './todo-app.controller';

describe('TodoAppController', () => {
  let controller: ToDoAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoAppController],
    }).compile();

    controller = module.get<ToDoAppController>(ToDoAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
