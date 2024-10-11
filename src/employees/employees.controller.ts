import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

import { PaginationDto } from 'src/shared';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('create')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const user = await this.employeesService.create(createEmployeeDto);
    return user;
  }

  @Get('getAllEmployees')
  async findAll(@Query() query: PaginationDto) {
    return this.employeesService.getAllEmployees(query);
  }

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeesService.create(createEmployeeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.employeesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeesService.update(+id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeesService.remove(+id);
  // }
}
