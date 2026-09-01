import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateLessonInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
