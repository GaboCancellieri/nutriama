import { model, Schema, Model, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  token: string;
}

const TokenSchema = new Schema({
    token: {type: String, required: true, unique: true }
});

export const RefreshToken: Model<IRefreshToken> = model('RefreshToken', TokenSchema, 'refresh_tokens');
