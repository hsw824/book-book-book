import { type RecordRow } from '@/models/recordTypes';
import type { PostData, PostResponse, RecordDetail, RecordList, UpdateData } from './recordTypes';

export interface RecordRepository {
  findListById(id: string, cursor: string | null, take: number): Promise<RecordList[]>;
  findById(id: string): Promise<RecordRow | null>;
  findDetailById(id: string): Promise<RecordDetail | null>;
  post(id: string, postData: PostData): Promise<PostResponse>;
  deleteById(id: string): Promise<RecordRow>;
  update(id: string, updateData: UpdateData): Promise<RecordDetail>;
}
