import { S3Client } from '@aws-sdk/client-s3';

import type { AuthResult } from '../../../auth/getAuth';
import { getEnvValue } from '../../../utils/getEnvValue';
import type { ActionResult } from '../../types';

export const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  };
};

export const createErrorResult = (code: string, message: string): ActionResult<never> => {
  return { ok: false, code, message };
};

export const createS3Client = () => {
  return new S3Client({
    region: getEnvValue('OCI_REGION'),
    endpoint: getEnvValue('OCI_ENDPOINT'),
    credentials: {
      accessKeyId: getEnvValue('OCI_ACCESS_KEY'),
      secretAccessKey: getEnvValue('OCI_SECRET_KEY'),
    },
    forcePathStyle: true,
  });
};
