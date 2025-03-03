import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto { 
    @ApiProperty({ description: 'First name of the user to search for', required: false })
    first_name?: string;
  
    @ApiProperty({ description: 'Last name of the user to search for', required: false })
    last_name?: string;
  
    @ApiProperty({ description: 'Age of the user to search for', required: false })
    age?: number;
}
