import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) { }

  async getAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  async getOne(id: string): Promise<Board> {
    return this.boardModel.findOne({ id });
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = new this.boardModel({...createBoardDto, id: uuid()});

    return board.save();
  }

  async remove(id:string): Promise<void> {
    const deleteResult = await this.boardModel.deleteOne({ id });

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Board with ID "${id} not found"`);
    }
  }

  async update(id: string, title: string): Promise<Board> {
    const board = await this.boardModel.findOne({ id });

    board.title = title;
    return await board.save();
  }
}
