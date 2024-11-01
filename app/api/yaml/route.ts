import { NextResponse } from 'next/server';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { Portfolio } from '@/types/portfolio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const environment = searchParams.get('env') || 'mvp';
  const filename = `game-development-${environment}.yaml`;

  try {
    const yamlPath = path.join(process.cwd(), 'mvp', 'yaml', filename);
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const data = yaml.load(fileContents) as Portfolio;

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Error loading YAML file ${filename}:`, error);
    return NextResponse.json({ error: 'Failed to load configuration' }, { status: 500 });
  }
} 