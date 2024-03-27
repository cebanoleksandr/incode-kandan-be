import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/auth/schemas/auth.schema";
import { Status } from "src/types";

export type CardDocument = Card & Document

@Schema()
export class Card {
  @Prop()
  id: string;

  @Prop()
  boardId: string;

  @Prop()
  status: Status;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: User;

  @Prop()
  date: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
