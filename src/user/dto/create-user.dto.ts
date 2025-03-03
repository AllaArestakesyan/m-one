import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class CreateUserDto {
    @ApiProperty({
        default: "Anna"
    })
    @JoiSchema(Joi.string().required())
    first_name: string;

    @ApiProperty({
        default: "Anyan"
    })
    @JoiSchema(Joi.string().required())
    last_name: string;

    @ApiProperty({
        default: 20
    })
    @JoiSchema(Joi.number().integer().min(0).required())
    age: number;

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
