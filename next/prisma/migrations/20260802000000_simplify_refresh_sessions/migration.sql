-- DropIndex
DROP INDEX "RefreshSession_revokedAt_idx";

-- DropIndex
DROP INDEX "RefreshSession_tokenFamilyId_key";

-- AlterTable
ALTER TABLE "RefreshSession"
DROP COLUMN "currentIssuedAt",
DROP COLUMN "lastUsedAt",
DROP COLUMN "tokenFamilyId",
DROP COLUMN "updatedAt",
DROP COLUMN "userAgent";
