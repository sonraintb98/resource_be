import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({
  discriminatorKey: 'kind',
  timestamps: true,
  collection: 'tokens',
})
export class Token {
  @Prop({ required: true })
  email: string;

  //now we do not use it, just save
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  idToken: string;
}

const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.index({ email: 1 }, { name: 'email-index', unique: true });

export { TokenSchema };
