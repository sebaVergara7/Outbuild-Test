import {
  IsString,
  IsDateString,
  ArrayNotEmpty,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { IsEndDateAfterStartDate } from "../validators/customValidators";

export class CreateActivityDto {
  @IsString()
  name!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  @IsEndDateAfterStartDate("startDate")
  endDate!: string;
}

export class BulkCreateActivitiesDto {
  @IsString()
  scheduleId!: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  activities!: CreateActivityDto[];
}
