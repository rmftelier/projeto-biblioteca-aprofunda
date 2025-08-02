import { User } from "@core/entities/User";
import { GetUserById } from "@core/usecases/users/GetUserById";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('GetUserById (UseCase)', () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it('deve retornar o usuário com o id correspondente corretamente', async () => {

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

    const getUserById = new GetUserById(userRepository);

    const correspondingUser = await getUserById.execute('1');

    expect(correspondingUser?.name).toBe('Example');
    expect(correspondingUser?.id).toBe('1');
    expect(correspondingUser?.email).toBe('example@email.com');
  });

  it('deve retornar o erro quando o usuário não for encontrado', async () => {

    const getUserById = new GetUserById(userRepository);

    await expect(
      getUserById.execute('2')
    ).rejects.toThrow('Usuário não encontrado');
  });
});