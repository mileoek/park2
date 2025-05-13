-- CreateTable
CREATE TABLE "Auto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plateNum" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "timeOcupied" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Auto_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "ParkPlace" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Auto_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParkPlace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "free" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "DeletedAuto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plateNum" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "timeOcupied" DATETIME NOT NULL,
    "timeDeleted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "payment" INTEGER NOT NULL,
    CONSTRAINT "DeletedAuto_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "ParkPlace" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeletedAuto_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "duration" INTEGER,
    "payment" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Auto_plateNum_key" ON "Auto"("plateNum");

-- CreateIndex
CREATE UNIQUE INDEX "Auto_placeId_key" ON "Auto"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "ParkPlace_name_key" ON "ParkPlace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
