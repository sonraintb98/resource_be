import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ discriminatorKey: 'kind', timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthDay: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  workingDay: string;

  @Prop({ required: true })
  CCCD: string;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: 'boolean',
    required: false,
    default: false,
  })
  isDeleted: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
