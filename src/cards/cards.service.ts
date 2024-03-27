import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { Status } from 'src/auth/status.type';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) { }

  async getAll(boardId: string): Promise<Card[]> {
    return this.cardModel.find({ boardId }).exec();
  }

  async getOne(id: string): Promise<Card> {
    return this.cardModel.findOne({ id });
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const card = new this.cardModel({...createCardDto, id: uuid(), status: Status.ToDo, date: new Date()});

    return card.save();
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.cardModel.deleteOne({ id });

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Card with ID "${id} not found"`);
    }
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const { title, description, author, status } = updateCardDto;
    const card = await this.cardModel.findOne({ id });

    card.title = title;
    card.description = description;
    card.author = author;
    card.status = status;

    return await card.save();
  }
}
