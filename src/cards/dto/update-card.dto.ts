import { IsEnum, IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";
import { Status } from "src/auth/status.type";

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