'use client';

export function ProjectSkeleton() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden animate-pulse">
      {/* Terminal Header */}
      <div className="bg-[#2a2a2a] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
        </div>
        <div className="ml-2 w-32 h-3 bg-gray-700 rounded"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6 mb-4"></div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 bg-gray-700 rounded w-16"></div>
          <div className="h-5 bg-gray-700 rounded w-20"></div>
          <div className="h-5 bg-gray-700 rounded w-14"></div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <div className="h-8 bg-gray-700 rounded w-24"></div>
          <div className="h-8 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function CertificationSkeleton() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-700 rounded"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="h-8 bg-gray-700 rounded w-20"></div>
    </div>
  );
}

export function LanguageBarSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-700 rounded-full w-full mb-4"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
              <div className="h-3 bg-gray-700 rounded w-20"></div>
            </div>
            <div className="h-3 bg-gray-700 rounded w-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
