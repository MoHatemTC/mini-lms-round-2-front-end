import React, { memo } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Checkbox } from '../../../../components/ui/Checkbox';
import { Label } from '../../../../components/ui/Label';

/**
 * CourseCatalogFilters
 * Reusable filter bar component for the course catalog.
 * Supports filtering by Track, Skill, Topic, Estimated Length, Course Status, and Certificate Availability.
 * Reuses existing project components (Card, Button, Checkbox, Label) and provides WAI-ARIA accessibility.
 */
const CourseCatalogFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableOptions = {},
  isLoading = false,
  hasActiveFilters = false
}) => {
  const tracks = availableOptions.tracks || ['All'];
  const skills = availableOptions.skills || ['All'];
  const topics = availableOptions.topics || ['All'];
  const lengths = availableOptions.lengths || ['All'];
  const statuses = availableOptions.statuses || ['All'];

  return (
    <Card className="p-5 sm:p-6 bg-white shadow-soft rounded-2xl border border-border/80 transition-all">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2 text-foreground font-bold text-sm sm:text-base">
          <Filter className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2>Course Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            disabled={isLoading}
            className="text-xs text-primary hover:text-primary-hover hover:bg-primary/5 flex items-center gap-1 h-8 px-2.5 rounded-lg font-semibold"
            aria-label="Reset all active filters"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Filters</span>
          </Button>
        )}
      </div>

      {/* Select Dropdowns Grid (Responsive: 1 col on mobile, 2-3 on tablet, 5 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        {/* Track Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="filter-track" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Track
          </Label>
          <select
            id="filter-track"
            value={filters.track || 'All'}
            onChange={(e) => onFilterChange('track', e.target.value)}
            disabled={isLoading}
            className="w-full py-2 pl-3 pr-8 text-sm border-border rounded-xl bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            aria-label="Filter by Course Track"
          >
            {tracks.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All Tracks' : option}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="filter-skill" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Skill
          </Label>
          <select
            id="filter-skill"
            value={filters.skill || 'All'}
            onChange={(e) => onFilterChange('skill', e.target.value)}
            disabled={isLoading}
            className="w-full py-2 pl-3 pr-8 text-sm border-border rounded-xl bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            aria-label="Filter by Skill"
          >
            {skills.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All Skills' : option}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="filter-topic" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Topic
          </Label>
          <select
            id="filter-topic"
            value={filters.topic || 'All'}
            onChange={(e) => onFilterChange('topic', e.target.value)}
            disabled={isLoading}
            className="w-full py-2 pl-3 pr-8 text-sm border-border rounded-xl bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            aria-label="Filter by Topic"
          >
            {topics.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All Topics' : option}
              </option>
            ))}
          </select>
        </div>

        {/* Estimated Length Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="filter-length" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Estimated Length
          </Label>
          <select
            id="filter-length"
            value={filters.estimatedLength || 'All'}
            onChange={(e) => onFilterChange('estimatedLength', e.target.value)}
            disabled={isLoading}
            className="w-full py-2 pl-3 pr-8 text-sm border-border rounded-xl bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            aria-label="Filter by Estimated Length"
          >
            {lengths.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'Any Length' : option}
              </option>
            ))}
          </select>
        </div>

        {/* Course Status Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="filter-status" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Course Status
          </Label>
          <select
            id="filter-status"
            value={filters.status || 'All'}
            onChange={(e) => onFilterChange('status', e.target.value)}
            disabled={isLoading}
            className="w-full py-2 pl-3 pr-8 text-sm border-border rounded-xl bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            aria-label="Filter by Course Status"
          >
            {statuses.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All Statuses' : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Controls: Certificate Availability Checkbox */}
      <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5">
          <Checkbox
            id="filter-cert"
            checked={!!filters.hasCertificate}
            onCheckedChange={(checked) => onFilterChange('hasCertificate', checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor="filter-cert"
            className="text-sm font-medium text-foreground cursor-pointer select-none leading-none"
          >
            Certificate Available Only
          </Label>
        </div>

        {hasActiveFilters && (
          <div className="text-xs text-text-secondary">
            Active filters applied
          </div>
        )}
      </div>
    </Card>
  );
};

export default memo(CourseCatalogFilters);
