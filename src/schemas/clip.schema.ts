
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClipDocument = HydratedDocument<Clip>;

@Schema()
export class Clip {
  @Prop()
  name: string;

  @Prop()
  timer: number;

  @Prop()
  youtube_id: string;

  @Prop()
  fighters: string;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
