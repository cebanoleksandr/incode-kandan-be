import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  cardId: string;

  @IsNotEmpty()
  author: User;
}
