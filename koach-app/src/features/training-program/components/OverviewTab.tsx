import {
  FileText,
  Building2,
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  ClipboardList,
  Layers,
} from 'lucide-react';
import { SectionCard } from '@/components/molecules/SectionCard';
import { FieldValue } from '@/components/molecules/FieldValue';
import { FileChip } from '@/components/molecules/FileChip';
import { Tag } from '@/components/atoms/Tag';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useProgramOverview } from '../hooks/useTrainingProgram';
import type { TestConfig } from '../types/training-program.types';

function TestSection({ title, config }: { title: string; config: TestConfig }) {
  return (
    <SectionCard title={title} icon={ClipboardCheck}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
        <FieldValue label={`Does this unit have ${title.toLowerCase()}?`}>{config.enabled}</FieldValue>
        <FieldValue label="Pass percentage">{config.passPercentage}</FieldValue>
        <FieldValue label="Easy questions">{config.easyQuestions}</FieldValue>
        <FieldValue label="Medium questions">{config.mediumQuestions}</FieldValue>
        <FieldValue label="Hard questions">{config.hardQuestions}</FieldValue>
        <FieldValue label="Duration (hh:mm)">{config.duration}</FieldValue>
      </div>
    </SectionCard>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={`sk-${i}`} className="rounded-lg border border-line bg-surface-card p-4 shadow-sm">
          <Skeleton className="mb-4 h-4 w-44" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((__, j) => (
              <Skeleton key={`sk-${i}-${j}`} className="h-10 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OverviewTab() {
  const { data, isLoading, isError } = useProgramOverview();

  if (isLoading || !data) return <OverviewSkeleton />;
  if (isError) {
    return (
      <div className="rounded-lg border border-danger/30 bg-danger-bg p-4 text-sm text-danger">
        Failed to load overview details.
      </div>
    );
  }

  const { details, source, classroom, types, validity, certification, preTest, postTest, flashcards } =
    data;

  return (
    <div className="space-y-4">
      <SectionCard title="Training program details" icon={FileText}>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-ink-secondary">Thumbnail image</span>
            <div className="flex aspect-[4/3] flex-col justify-between rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 p-4 text-white">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-white/70">Post Basic</p>
                <p className="mt-1 text-lg font-bold leading-tight">{details.thumbnailTitle}</p>
              </div>
              <p className="text-[10px] uppercase tracking-wide text-white/70">
                {details.thumbnailSubtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <FieldValue label="Unit overview">
              <span className="font-normal leading-relaxed text-ink-secondary">
                {details.overviewText}
              </span>
            </FieldValue>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
              <FieldValue label="Training program code">{details.programCode}</FieldValue>
              <FieldValue label="Duration (hh:mm)">{details.duration}</FieldValue>
              <FieldValue label="Previous sequence">{details.previousSequence}</FieldValue>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-ink-secondary">Knowledge tag</span>
              <div className="flex flex-wrap gap-2">
                {details.knowledgeTags.map((t) => (
                  <Tag key={t} tone="brand">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-ink-secondary">Competency impact</span>
              <div className="flex flex-wrap gap-2">
                {details.competencyImpact.map((t) => (
                  <Tag key={t} tone="brand">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Training program source" icon={Building2}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
          <FieldValue label="Program SME">{source.programSme}</FieldValue>
          <FieldValue label="Department">{source.department}</FieldValue>
          <FieldValue label="Division">{source.division}</FieldValue>
          <FieldValue label="Business unit">{source.businessUnit}</FieldValue>
        </div>
      </SectionCard>

      <SectionCard title="Classroom training requirements" icon={GraduationCap}>
        <div className="space-y-4">
          <FieldValue label="Nomination type">{classroom.nominationType}</FieldValue>
          <div className="space-y-2">
            <span className="text-xs text-ink-secondary">Uploaded files</span>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {classroom.uploadedFiles.map((file) => (
                <FileChip key={file.id} name={file.name} size={file.size} />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Training program types" icon={Layers}>
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-xs font-semibold text-ink-tertiary">Training program type 1</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3">
              <FieldValue label="Mandatory">{types.mandatory}</FieldValue>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-ink-secondary">Mandatory type</span>
                <div className="flex flex-wrap gap-2">
                  {types.mandatoryTypes.map((t) => (
                    <Tag key={t} tone="brand">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
              <FieldValue label="Mandatory subtype">{types.mandatorySubtype}</FieldValue>
            </div>
          </div>
          <div className="border-t border-line pt-4">
            <p className="mb-3 text-xs font-semibold text-ink-tertiary">Training program type 2</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
              <FieldValue label="Clinical type">{types.clinicalType}</FieldValue>
              <FieldValue label="Training category type">{types.trainingCategoryType}</FieldValue>
              <FieldValue label="Content provider type">{types.contentProviderType}</FieldValue>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Unit validity" icon={ShieldCheck}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
          <FieldValue label="Does this unit have validity?">{validity.hasValidity}</FieldValue>
          <FieldValue label="Validity period (in months)">{validity.validityMonths}</FieldValue>
        </div>
      </SectionCard>

      <SectionCard title="Certification details" icon={BadgeCheck}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
          <FieldValue label="Certificate on completion">{certification.onCompletion}</FieldValue>
          <FieldValue label="Certificate template">{certification.template}</FieldValue>
          <FieldValue label="Certificate validity (in months)">{certification.validityMonths}</FieldValue>
          <FieldValue label="Signature image 1 on certificate">
            <span className="font-medium text-brand-600 underline">{certification.signatureImage1}</span>
          </FieldValue>
          <FieldValue label="Signature image 2 on certificate">
            <span className="font-medium text-brand-600 underline">{certification.signatureImage2}</span>
          </FieldValue>
          <FieldValue label="Image on certificate">
            <span className="font-medium text-brand-600 underline">{certification.imageOnCertificate}</span>
          </FieldValue>
        </div>
      </SectionCard>

      <TestSection title="Pre-test" config={preTest} />
      <TestSection title="Post-test" config={postTest} />

      <SectionCard title="Flashcards" icon={ClipboardList}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
          <FieldValue label="Does this unit have flashcards?">{flashcards.enabled}</FieldValue>
          <FieldValue label="Pass percentage">{flashcards.passPercentage}</FieldValue>
          <FieldValue label="Due after (in days)">{flashcards.dueAfterDays}</FieldValue>
          <FieldValue label="Completion period (in days)">{flashcards.completionPeriodDays}</FieldValue>
          <FieldValue label="Number of retakes">{flashcards.numberOfRetakes}</FieldValue>
          <FieldValue label="Easy questions">{flashcards.easyQuestions}</FieldValue>
          <FieldValue label="Medium questions">{flashcards.mediumQuestions}</FieldValue>
          <FieldValue label="Hard questions">{flashcards.hardQuestions}</FieldValue>
        </div>
      </SectionCard>
    </div>
  );
}
