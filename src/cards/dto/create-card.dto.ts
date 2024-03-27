import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";

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
