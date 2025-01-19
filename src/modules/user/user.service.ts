import { fastify } from "../../app/app";
import { CreateUserBody } from "./user.schemas";



class UserService{

  public async createUser(userInput: CreateUserBody) {
    return userInput;
  }
}




export default new UserService();