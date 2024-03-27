import { IsNotEmpty } from "class-validator";
import { User } from "src/utils/user";

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  cardId: string;

  @IsNotEmpty()
  author: User;
}
