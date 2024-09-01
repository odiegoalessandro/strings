import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIzNDEyMzQyNDEzMjE0MjMiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.UXWJHIc8MPSvP8BBJUrctW_STfp9kUuU0SVMiwZRC2Y',
  })
  accessToken: string;
}
