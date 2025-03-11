import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/types';
import { UserDocument, UserRepository, UserRoleRepository } from 'src/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: UserRoleRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userRepo.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Sai email hoặc mật khẩu');
    }

    // Get permissions
    const role = await this.roleRepo.findOne({ roleName: user?.role });
    let permissions: string[] = [];
    if (role) {
      permissions = role.permissions.split(',') as string[];
    }

    // Generate token
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      permissions: permissions,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
