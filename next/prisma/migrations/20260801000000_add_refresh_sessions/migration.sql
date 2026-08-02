-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sessionId" VARCHAR(64) NOT NULL,
    "tokenFamilyId" VARCHAR(64) NOT NULL,
    "currentTokenHash" VARCHAR(128) NOT NULL,
    "absoluteExpiresAt" TIMESTAMP(3) NOT NULL,
    "currentIssuedAt" TIMESTAMP(3) NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "userAgent" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_sessionId_key" ON "RefreshSession"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_tokenFamilyId_key" ON "RefreshSession"("tokenFamilyId");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_idx" ON "RefreshSession"("userId");

-- CreateIndex
CREATE INDEX "RefreshSession_absoluteExpiresAt_idx" ON "RefreshSession"("absoluteExpiresAt");

-- CreateIndex
CREATE INDEX "RefreshSession_revokedAt_idx" ON "RefreshSession"("revokedAt");

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
