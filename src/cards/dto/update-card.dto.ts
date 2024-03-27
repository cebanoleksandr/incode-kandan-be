import { IsEnum, IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/auth.schema";

export enum Status {
  ToDo = 'TO-DO',
  InProgress = 'IN-PROGRESS',
  Done = 'DONE',
}

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