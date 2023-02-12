
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FighterDocument = HydratedDocument<Fighter>;

@Schema()
export class Fighter {
  @Prop()
  id: number;

  @Prop()
  smash_id: string;

  @Prop()
  name: string;

  @Prop()
  name_fr_ca: string;

  @Prop()
  name_fr_fr: string;

  @Prop()
  name_es_la: string;

  @Prop()
  name_es_es: string;
}

export const FighterSchema = SchemaFactory.createForClass(Fighter);
