import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
