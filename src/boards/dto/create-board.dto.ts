import { IsNotEmpty } from "class-validator";
import { User } from "src/utils/user";

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: User;
}
