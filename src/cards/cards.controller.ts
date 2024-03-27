import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './schemas/card.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) { }

  @Get('/:boardId')
  getAll(@Param('boardId') boardId: string): Promise<Card[]> {
    return this.cardsService.getAll(boardId);
  }

  @Get('/:id/card')
  getOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.getOne(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cardsService.remove(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardsService.update(id, updateCardDto);
  }
}
