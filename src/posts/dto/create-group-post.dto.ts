import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGroupPostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({}, { each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  userId: number[];
}
