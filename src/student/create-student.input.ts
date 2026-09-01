import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Field()
  lastName: string;
}
