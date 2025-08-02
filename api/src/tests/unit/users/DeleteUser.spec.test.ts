import { User } from "@core/entities/User";
import { DeleteUser } from "@core/usecases/users/DeleteUser";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('DeleteUser (UseCase)', () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it('deve excluir um usuário existente com sucesso', async () => {

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

    const deleteUser = new DeleteUser(userRepository);
    await deleteUser.execute(user.id as string);

    const deletedUser = await userRepository.findById(user.id!);
    expect(deletedUser).toBeNull();
  });

  it("deve lançar um erro ao tentar excluir um usuário inexistente", async () => {
    const deleteuser = new DeleteUser(userRepository);

    await expect(deleteuser.execute('id-inexistente')).rejects.toThrow('Usuário não encontrado');
  })

});