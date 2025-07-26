import { MongoBookRepository } from './repositories/MongoBookRepository';
import { MongoUserRepository } from './repositories/MongoUserRepository';

export const bookRepository = new MongoBookRepository();
export const userRepository = new MongoUserRepository();