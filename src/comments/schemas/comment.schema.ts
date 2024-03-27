import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/utils/user";

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
  @Prop()
  id: string;

  @Prop()
  cardId: string;

  @Prop()
  text: string;

  @Prop()
  author: User;

  @Prop()
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
