import { IsString, Matches, MaxLength, MinLength } from "@nestjs/class-validator";

export class LoginCredentialsDto {
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { 
    message: 'Invalid Email'
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
    message: 'Password is too weak'
  })
  password: string;
}
