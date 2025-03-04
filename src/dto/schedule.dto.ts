import { IsString, IsUrl } from "class-validator";

export class CreateScheduleDto {
  @IsString()
  name!: string;

  @IsUrl()
  imageUrl!: string;
}
