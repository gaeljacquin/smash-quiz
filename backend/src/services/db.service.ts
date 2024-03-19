import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';

@Injectable()
export class DbService {
  constructor(private readonly prisma: PrismaService) {}

  async saveLog(data: any): Promise<void> {
    await this.prisma.logs.create({
      data,
    });
  }
}
