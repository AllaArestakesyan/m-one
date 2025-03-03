import { ApiProperty } from "@nestjs/swagger"
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class LoginUser {
  @ApiProperty({
    default: "anna@gmail.com"
  })
  @JoiSchema(Joi.string().email().required())
  email: string;

  @ApiProperty({
    default: "11111"
  })
  @JoiSchema(Joi.string().length(5).required())
  password: string;
}