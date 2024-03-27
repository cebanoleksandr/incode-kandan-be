import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/utils/user";

export type BoardDocument = Board & Document

@Schema()
export class Board {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  author: User;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
