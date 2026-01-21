-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'MANAGER', 'BUILDER', 'DESIGNER', 'ENGINEER', 'MODERATOR', 'SUPPLIER', 'COMPLETIONIST');

-- CreateEnum
CREATE TYPE "PresetStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'READY_FOR_REVIEW', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'READY_FOR_ACCEPTANCE', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CheckpointStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED_BY_BUILDER', 'ACCEPTED_BY_CUSTOMER', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brigades" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalStatus" TEXT,
    "registrationAddress" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "description" TEXT,
    "specialization" TEXT,
    "yearsTogether" INTEGER,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "completedProjects" INTEGER NOT NULL DEFAULT 0,
    "onTimePercent" DOUBLE PRECISION DEFAULT 0,
    "averageDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "brigades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brigade_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" INTEGER,
    "photo" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brigadeId" TEXT NOT NULL,

    CONSTRAINT "brigade_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "projectType" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brigadeId" TEXT NOT NULL,

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brigade_documents" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brigadeId" TEXT NOT NULL,

    CONSTRAINT "brigade_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "apartmentType" TEXT,
    "style" TEXT,
    "budgetCategory" TEXT,
    "totalArea" DOUBLE PRECISION,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER,
    "status" "PresetStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_subsection_types" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_subsection_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_budget_sections" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_budget_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_budget_subsections" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "subsectionTypeId" TEXT NOT NULL,
    "name" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_budget_subsections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_budget_items" (
    "id" TEXT NOT NULL,
    "subsectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "unitPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_stages" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "plannedDurationDays" INTEGER,
    "paymentPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_stage_dependencies" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "dependsOnId" TEXT NOT NULL,

    CONSTRAINT "preset_stage_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_stage_subsection_types" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "subsectionTypeId" TEXT NOT NULL,

    CONSTRAINT "preset_stage_subsection_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_checkpoints" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "paymentPercentWithinStage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "relatedSubsectionTypeId" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset_files" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preset_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "plannedEndDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "totalBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "detailLevel" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,
    "managerId" TEXT,
    "brigadeId" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_subsection_types" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "presetSubsectionTypeId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_subsection_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_budget_sections" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "presetBudgetSectionId" TEXT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "plannedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_budget_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_budget_subsections" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "subsectionTypeId" TEXT NOT NULL,
    "presetBudgetSubsectionId" TEXT,
    "name" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "plannedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_budget_subsections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_budget_items" (
    "id" TEXT NOT NULL,
    "subsectionId" TEXT NOT NULL,
    "presetBudgetItemId" TEXT,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "unitPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualQuantity" DOUBLE PRECISION,
    "actualUnitPrice" DOUBLE PRECISION,
    "actualTotalPrice" DOUBLE PRECISION DEFAULT 0,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stages" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "presetStageId" TEXT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "StageStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "plannedStartDate" TIMESTAMP(3),
    "plannedEndDate" TIMESTAMP(3),
    "actualStartDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "paymentPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stage_dependencies" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "dependsOnId" TEXT NOT NULL,

    CONSTRAINT "project_stage_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stage_subsection_types" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "subsectionTypeId" TEXT NOT NULL,

    CONSTRAINT "project_stage_subsection_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_checkpoints" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "presetCheckpointId" TEXT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "CheckpointStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "paymentPercentWithinStage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "relatedSubsectionTypeId" TEXT,
    "submittedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_files" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "uploadedById" TEXT NOT NULL,
    "relatedStageId" TEXT,
    "relatedCheckpointId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_payments" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "checkpointId" TEXT,
    "subsectionTypeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "invoiceNumber" TEXT,
    "invoiceDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidById" TEXT,

    CONSTRAINT "project_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "checkpointId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "brigades_userId_key" ON "brigades"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "preset_subsection_types_presetId_code_key" ON "preset_subsection_types"("presetId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "preset_budget_subsections_sectionId_subsectionTypeId_key" ON "preset_budget_subsections"("sectionId", "subsectionTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "preset_stage_dependencies_stageId_dependsOnId_key" ON "preset_stage_dependencies"("stageId", "dependsOnId");

-- CreateIndex
CREATE UNIQUE INDEX "preset_stage_subsection_types_stageId_subsectionTypeId_key" ON "preset_stage_subsection_types"("stageId", "subsectionTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "project_subsection_types_projectId_code_key" ON "project_subsection_types"("projectId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "project_budget_subsections_sectionId_subsectionTypeId_key" ON "project_budget_subsections"("sectionId", "subsectionTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "project_stage_dependencies_stageId_dependsOnId_key" ON "project_stage_dependencies"("stageId", "dependsOnId");

-- CreateIndex
CREATE UNIQUE INDEX "project_stage_subsection_types_stageId_subsectionTypeId_key" ON "project_stage_subsection_types"("stageId", "subsectionTypeId");

-- AddForeignKey
ALTER TABLE "brigades" ADD CONSTRAINT "brigades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brigade_members" ADD CONSTRAINT "brigade_members_brigadeId_fkey" FOREIGN KEY ("brigadeId") REFERENCES "brigades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_brigadeId_fkey" FOREIGN KEY ("brigadeId") REFERENCES "brigades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brigade_documents" ADD CONSTRAINT "brigade_documents_brigadeId_fkey" FOREIGN KEY ("brigadeId") REFERENCES "brigades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presets" ADD CONSTRAINT "presets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_subsection_types" ADD CONSTRAINT "preset_subsection_types_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "presets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_budget_sections" ADD CONSTRAINT "preset_budget_sections_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "presets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_budget_subsections" ADD CONSTRAINT "preset_budget_subsections_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "preset_budget_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_budget_subsections" ADD CONSTRAINT "preset_budget_subsections_subsectionTypeId_fkey" FOREIGN KEY ("subsectionTypeId") REFERENCES "preset_subsection_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_budget_items" ADD CONSTRAINT "preset_budget_items_subsectionId_fkey" FOREIGN KEY ("subsectionId") REFERENCES "preset_budget_subsections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_stages" ADD CONSTRAINT "preset_stages_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "presets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_stage_dependencies" ADD CONSTRAINT "preset_stage_dependencies_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "preset_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_stage_dependencies" ADD CONSTRAINT "preset_stage_dependencies_dependsOnId_fkey" FOREIGN KEY ("dependsOnId") REFERENCES "preset_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_stage_subsection_types" ADD CONSTRAINT "preset_stage_subsection_types_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "preset_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_stage_subsection_types" ADD CONSTRAINT "preset_stage_subsection_types_subsectionTypeId_fkey" FOREIGN KEY ("subsectionTypeId") REFERENCES "preset_subsection_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_checkpoints" ADD CONSTRAINT "preset_checkpoints_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "preset_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_checkpoints" ADD CONSTRAINT "preset_checkpoints_relatedSubsectionTypeId_fkey" FOREIGN KEY ("relatedSubsectionTypeId") REFERENCES "preset_subsection_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preset_files" ADD CONSTRAINT "preset_files_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "presets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "presets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_brigadeId_fkey" FOREIGN KEY ("brigadeId") REFERENCES "brigades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_subsection_types" ADD CONSTRAINT "project_subsection_types_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_budget_sections" ADD CONSTRAINT "project_budget_sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_budget_subsections" ADD CONSTRAINT "project_budget_subsections_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "project_budget_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_budget_subsections" ADD CONSTRAINT "project_budget_subsections_subsectionTypeId_fkey" FOREIGN KEY ("subsectionTypeId") REFERENCES "project_subsection_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_budget_items" ADD CONSTRAINT "project_budget_items_subsectionId_fkey" FOREIGN KEY ("subsectionId") REFERENCES "project_budget_subsections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stages" ADD CONSTRAINT "project_stages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_dependencies" ADD CONSTRAINT "project_stage_dependencies_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "project_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_dependencies" ADD CONSTRAINT "project_stage_dependencies_dependsOnId_fkey" FOREIGN KEY ("dependsOnId") REFERENCES "project_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_subsection_types" ADD CONSTRAINT "project_stage_subsection_types_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "project_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_subsection_types" ADD CONSTRAINT "project_stage_subsection_types_subsectionTypeId_fkey" FOREIGN KEY ("subsectionTypeId") REFERENCES "project_subsection_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_checkpoints" ADD CONSTRAINT "project_checkpoints_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "project_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_checkpoints" ADD CONSTRAINT "project_checkpoints_relatedSubsectionTypeId_fkey" FOREIGN KEY ("relatedSubsectionTypeId") REFERENCES "project_subsection_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_files" ADD CONSTRAINT "project_files_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_files" ADD CONSTRAINT "project_files_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_files" ADD CONSTRAINT "project_files_relatedStageId_fkey" FOREIGN KEY ("relatedStageId") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_files" ADD CONSTRAINT "project_files_relatedCheckpointId_fkey" FOREIGN KEY ("relatedCheckpointId") REFERENCES "project_checkpoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "project_checkpoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_subsectionTypeId_fkey" FOREIGN KEY ("subsectionTypeId") REFERENCES "project_subsection_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "project_checkpoints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

┌─────────────────────────────────────────────────────────┐
│  Update available 5.22.0 -> 7.2.0                       │
│                                                         │
│  This is a major update - please follow the guide at    │
│  https://pris.ly/d/major-version-upgrade                │
│                                                         │
│  Run the following to update                            │
│    npm i --save-dev prisma@latest                       │
│    npm i @prisma/client@latest                          │
└─────────────────────────────────────────────────────────┘
