import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, ParseIntPipe, } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guard/role';
import { RolesGuard } from '../auth/guard/role.guard';
import { userRole } from './enum/user.role.enum';
import { LoginDto } from './dto/login.dto';
import {  Response } from 'express';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BlockGuard } from 'src/auth/guard/block.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Post('signin')
  signIn(@Body() LoginDto:LoginDto,    @Res() res: Response) {
    return this.userService.signIn(LoginDto,res);
  }
  @Get()
  @UseGuards(AuthGuard(),RolesGuard)
   @Roles('admin', 'superadmin') // Only allow admin and superadmin to access this route
   findAll() {
   return this.userService.findAll();
   }
   @Get(':id')
   async getById(@Param('id') id: string): Promise<User> {
     return this.userService.findOneById(id);
   }
    @Patch(':id')
   async update(@Param('id',) id: string, @Body() updateData: Partial<User>) {
     return  await this.userService.update(id, updateData);
   }

   
   @Delete(':id')
   @UseGuards(AuthGuard())
   @Roles(userRole.SUPERADMIN) // Only allow superadmin to delete others
   async delete(@Param('id') id:string) {
     return this.userService.remove(id);
   }

   
  @Patch(':id/demote')
  @UseGuards(AuthGuard())
  @Roles(userRole.SUPERADMIN) // Only allow superadmin to demote others
  async DemoteAdmin(@Param('id') id: string) {
    return this.userService.DemoteAdmin(id);
  }
  
  @Patch(':id/promote')
  @UseGuards(AuthGuard())
  @Roles(userRole.ADMIN, userRole.SUPERADMIN) // Only allow admin to promote others
  async makeadmin(@Param('id') id: string) {
    return this.userService.promoteToAdmin(id);
  }

  
  @Patch('block/:id')
  @UseGuards(AuthGuard(), RolesGuard, BlockGuard) // Ensure that JWT auth and roles guard are applied
  @Roles('admin','superadmin') // Only admin users can access this endpoint
  async blockUser(@Param('id') id: string) {
    return this.userService.blockUser(id);
  }

  @Patch('unblock/:id')
  @UseGuards(AuthGuard(), RolesGuard) // Ensure that JWT auth and roles guard are applied
  @Roles('admin','superadmin') // Only admin users can access this endpoint
  async unblockUser(@Param('id') id: string) {
    return this.userService.unblockUser(id);
  }
}
