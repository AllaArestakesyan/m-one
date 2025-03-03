import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class SendFriendRequestDto {

    @ApiProperty({
        default: 1,
        description: 'The user who is receiving the request '
    })
    @JoiSchema(Joi.number().integer().min(0).required())
    user_id: number;
}
