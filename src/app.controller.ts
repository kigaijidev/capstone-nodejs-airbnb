import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiTagsEnum } from './enums/apitags.enum';

@Controller('')
@ApiTags(ApiTagsEnum.HOME)
export class AppController {

    @Get()
    documentions(@Res() res) {
        return res.redirect('/docs');
    }

}
