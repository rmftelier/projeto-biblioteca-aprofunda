import { User } from "@core/entities/User";
import { CreateUser } from "@core/usecases/users/CreateUser";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('CreateUser (UseCase)', () => {

  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it('deve criar um novo usuário e armazenar no repositório', async () => {
    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute({
      name: 'Example',
      login: 'example',
      password: '123456',
      email: 'example@email.com',
      role: 'admin',
      borrowedBooksId: []
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('Example');
    expect(user.login).toBe('example');
    expect(user.role).toBe('admin');
    expect(user.borrowedBooksId).toHaveLength(0);
  })
})