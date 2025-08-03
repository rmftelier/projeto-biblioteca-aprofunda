import { User } from "@core/entities/User";
import { GetAllUsers } from "@core/usecases/users/GetAllUsers";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('GetAllUsers (UseCase)', () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it('deve retornar todos os usuários criados', async () => {

    const user = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      [],
      '1'
    );

    await userRepository.save(user);

    const getAllUsers = new GetAllUsers(userRepository);

    const users = await getAllUsers.execute();

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Example');
    expect(users[0].role).toBe('admin');
  });
});