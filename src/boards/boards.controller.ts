import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './schemas/board.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) { }

  @Get()
  getAll(): Promise<Board[]> {
    return this.boardsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getOne(id);
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.boardsService.remove(id);
  }

  @Patch('/:id/title')
  update(@Param('id') id: string, @Body('title') title: string): Promise<Board> {
    return this.boardsService.update(id, title);
  }
}
