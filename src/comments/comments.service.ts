import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }

  async getAll(cardId: string): Promise<Comment[]> {
    return this.commentModel.find({ cardId }).exec();
  }

  async getOne(id: string): Promise<Comment> {
    return this.commentModel.findOne({ id });
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const card = new this.commentModel({...createCommentDto, id: uuid(), date: new Date()});

    return card.save();
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.commentModel.deleteOne({ id });

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Comment with ID "${id} not found"`);
    }
  }

  async update(id: string, text: string): Promise<Comment> {
    const comment = await this.commentModel.findOne({ id });

    comment.text = text;
    return await comment.save();
  }
}
