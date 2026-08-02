-- Rename the persisted absolute session expiration column without changing its data.
ALTER TABLE "RefreshSession"
RENAME COLUMN "absoluteExpiresAt" TO "absoluteSessionExpiresAt";

ALTER INDEX "RefreshSession_absoluteExpiresAt_idx"
RENAME TO "RefreshSession_absoluteSessionExpiresAt_idx";
