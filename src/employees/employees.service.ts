import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';
import { EmployeesRepository } from 'src/employees/enployees.repository';
import { failureResponse, PaginationDto, successResponse } from 'src/shared';
import responseMessage from 'src/common/messages';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    private readonly employeesRepository: EmployeesRepository,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const user = await this.employeesRepository.findByCCCD(
      createEmployeeDto.CCCD,
    );
    if (user) {
      throw new BadRequestException(
        'The CCCD is already used, please choose another one to sign up!',
      );
    }
    const newEmployee =
      await this.employeesRepository.create(createEmployeeDto);

    return newEmployee;
  }

  async getAllEmployees(paginationDto?: PaginationDto) {
    let res = successResponse();
    try {
      const usersResponse = await this.employeesRepository.paginate(
        { isDeleted: false },
        paginationDto,
      );
      res.data = usersResponse.data;
      res.pagination = usersResponse.pagination;
    } catch (error) {
      res = failureResponse(
        [],
        error.message || responseMessage.unknownException,
      );
    }

    return res;
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
