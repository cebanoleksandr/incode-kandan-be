import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get('/:cardId')
  getAll(@Param('cardId') cardId: string): Promise<Comment[]> {
    return this.commentsService.getAll(cardId);
  }

  @Get('/:id/comment')
  getOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.getOne(id);
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body('text') text: string): Promise<Comment> {
    return this.commentsService.update(id, text);
  }
}
