import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import type { Roster } from '~/interfaces/roster';
import type { CharacterPlus } from '~/interfaces/character';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/data', 'roster.json');
  const res: Roster = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as CharacterPlus[];

  return NextResponse.json(res);
}
