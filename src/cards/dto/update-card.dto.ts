import { IsEnum, IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";
import { Status } from "src/auth/types";

export class UpdateCardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  author: User;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}