import { User } from "@core/entities/User";
import { UpdateUser } from "@core/usecases/users/UpdateUser";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";
import bcrypt from "bcrypt";

describe('UpdateUser (UseCase)', () => {
  let userRepository: InMemoryUserRepository;
  let user: User;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    const newUser = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      [],
      '1'
    );

    userRepository.save(newUser);
    user = newUser;

  });

  it('deve atualizar um usuário existente com sucesso', async () => {

    const updateUser = new UpdateUser(userRepository);

    const updateData = {
      name: 'Update Example',
      login: 'upexample',
      email: 'upexample@email.com'
    }

    const updatedUser = await updateUser.execute('1', updateData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser?.name).toBe('Update Example');
    expect(updatedUser?.login).toEqual('upexample');
    expect(updatedUser?.password).toEqual('123456');
    expect(updatedUser?.email).toEqual('upexample@email.com');
    expect(updatedUser?.role).toEqual('admin');
    expect(updatedUser?.borrowedBooksId).toEqual([]);
  });

  it('deve manter os campos anteriores se o data estiver vazio.', async () => {

    const updateUser = new UpdateUser(userRepository);

    const update = await updateUser.execute(user.id as string, {});

    expect(update).toEqual(user);
  });

  it('não deve alterar nada se o usuário não existir no repositório', async () => {

    const updateUser = new UpdateUser(userRepository);

    await expect(
      updateUser.execute('99', { name: 'Example 2' })
    ).rejects.toThrow('Usuário não encontrado');

  });

  it('deve criptografar a senha do usuário se ela for alterada', async () => {
    const updateUser = new UpdateUser(userRepository);

    const newPassword = 'novaSenha123';

    const updatedUser = await updateUser.execute(user.id as string, {
      password: newPassword
    });

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser?.password).not.toEqual('123456'); // senha original
    const isPasswordHashed = await bcrypt.compare(newPassword, updatedUser!.password);
    expect(isPasswordHashed).toBe(true);
  });

});






