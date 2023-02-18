
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FighterDocument = HydratedDocument<Fighter>;

@Schema()
export class Fighter {
  @Prop()
  smash_id: string;

  @Prop()
  name: Map<string, string>;
}

export const FighterSchema = SchemaFactory.createForClass(Fighter);
