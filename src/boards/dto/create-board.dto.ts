import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: User;
}
