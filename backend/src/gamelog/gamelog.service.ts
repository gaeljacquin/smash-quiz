import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { logs, Prisma } from '@prisma/client';

@Injectable()
export class GameLogsService {
  constructor(private prisma: PrismaService) {}

  async createLog(data: Prisma.logsCreateInput): Promise<logs> {
    return this.prisma.logs.create({
      data,
    });
  }
}
