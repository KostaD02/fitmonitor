import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { API_CONFIG } from '@fitmonitor/consts';
import { AuthExpectionKeys } from '@fitmonitor/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    required: true,
  })
  @IsString({
    message: AuthExpectionKeys.FirstnameShouldBeString,
  })
  @MinLength(API_CONFIG.MIN_FIRSTNAME_LENGTH, {
    message: AuthExpectionKeys.FirstnameTooShort,
  })
  @MaxLength(API_CONFIG.MAX_FIRSTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooLong,
  })
  firstName!: string;

  @ApiProperty({
    required: true,
  })
  @IsString({
    message: AuthExpectionKeys.LastnameShouldBeString,
  })
  @MinLength(API_CONFIG.MIN_LASTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooShort,
  })
  @MaxLength(API_CONFIG.MAX_LASTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooLong,
  })
  lastName!: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail({}, { message: AuthExpectionKeys.InvalidEmail })
  email!: string;

  @ApiProperty({
    required: true,
  })
  @IsString({ message: AuthExpectionKeys.InvalidPassword })
  @MinLength(API_CONFIG.MIN_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooShort,
  })
  @MaxLength(API_CONFIG.MAX_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooLong,
  })
  password!: string;
}
