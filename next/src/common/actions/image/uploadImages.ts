'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'node:buffer';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

import {
  DIARY_IMAGE_ALLOWED_MIME_TYPES,
  DIARY_IMAGE_MAX_COUNT,
  DIARY_IMAGE_MAX_SIZE_BYTES,
  DIARY_IMAGE_MAX_SIZE_MB,
} from '../../constants/image';
import { getAuth } from '../../auth/getAuth';
import { getEnvValue } from '../../utils/getEnvValue';
import type { ActionResult } from '../types';
import { createAuthErrorResult, createErrorResult, createS3Client, validateImageBuffer } from './utils';

export const uploadImages = async (formData: FormData): Promise<ActionResult<string[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const files = formData
      .getAll('image')
      .filter((file): file is File => file instanceof File && file.size > 0);

    if (files.length === 0) {
      return createErrorResult('IMAGE_REQUIRED', '이미지 파일이 없습니다.');
    }

    if (files.length > DIARY_IMAGE_MAX_COUNT) {
      return createErrorResult('IMAGE_COUNT_EXCEEDED', `이미지 파일은 최대 ${DIARY_IMAGE_MAX_COUNT}개까지 삽입 가능합니다.`);
    }

    const invalidTypeFile = files.find((file) => !DIARY_IMAGE_ALLOWED_MIME_TYPES.includes(file.type as typeof DIARY_IMAGE_ALLOWED_MIME_TYPES[number]));
    if (invalidTypeFile) {
      return createErrorResult('INVALID_IMAGE_TYPE', '이미지 파일만 업로드 가능합니다.');
    }

    const overSizeFile = files.find((file) => file.size > DIARY_IMAGE_MAX_SIZE_BYTES);
    if (overSizeFile) {
      return createErrorResult('IMAGE_SIZE_EXCEEDED', `선택된 이미지 중 ${DIARY_IMAGE_MAX_SIZE_MB}MB를 초과하는 이미지가 존재합니다.`);
    }

    const s3 = createS3Client();
    const bucketName = getEnvValue('OCI_BUCKET_NAME');
    const endpoint = getEnvValue('OCI_ENDPOINT');

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!validateImageBuffer(buffer)) {
        return createErrorResult('INVALID_IMAGE_SIGNATURE', '유효하지 않은 이미지 파일입니다. 실제 이미지 파일만 업로드 가능합니다.');
      }

      const optimizedImage = await sharp(buffer)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85,
          progressive: true,
        })
        .toBuffer();

      const filename = `img/${Date.now()}_${randomUUID()}.jpg`;

      await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: optimizedImage,
        ContentType: 'image/jpeg',
      }));

      uploadedUrls.push(`${endpoint}/${bucketName}/${filename}`);
    }

    return { ok: true, data: uploadedUrls };
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return createErrorResult('IMAGE_UPLOAD_FAILED', '이미지 업로드 중 오류가 발생했습니다.');
  }
};
