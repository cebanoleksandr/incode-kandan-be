import { IsNotEmpty } from "class-validator";
import { User } from "src/utils/user";

export class CreateCardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  author: User;
}
