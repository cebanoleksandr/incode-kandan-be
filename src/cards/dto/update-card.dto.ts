import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Status } from "src/utils/types";
import { User } from "src/utils/user";

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