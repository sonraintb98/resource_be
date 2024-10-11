import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CONST, Pagination } from 'src/common';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { PaginationDto } from 'src/shared';

@Injectable()
export class EmployeesRepository {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async paginate(
    filter?: FilterQuery<Employee>,
    pagination?: PaginationDto,
  ): Promise<{ data: Employee[]; pagination: Pagination }> {
    const page: number = pagination?.page || CONST.DEFAULT_START_PAGE;
    const limit: number = pagination?.limit || CONST.DEFAULT_LIMIT_QUERY;
    const count = await this.employeeModel.count(filter).exec();
    const data = await this.employeeModel
      .find(filter, null, {
        sort: {
          _id: -1, // -1: DESC; 1: ASC
        },
        skip: (page - 1) * limit,
        limit: Number(limit),
      })
      .exec();

    return { data: data, pagination: { total: count, page, limit } };
  }

  findByCCCD(CCCD: string): Promise<Employee> {
    return this.employeeModel.findOne({ CCCD }).exec();
  }
}
