/**
 * =====================================================
 * FILE: property-approval-buttons.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Property approval buttons.
 *
 * FEATURES:
 * - Approve button
 * - Reject button
 * - Hidden when already approved/rejected
 * =====================================================
 */

import {
  approveProperty,
  rejectProperty,
} from "@/actions/property-actions";

interface Props {
  propertyId: string;
  approvalStatus: string;
}

export default function PropertyApprovalButtons({
  propertyId,
  approvalStatus,
}: Props) {
  /**
   * Already approved/rejected.
   * No action required.
   */
  if (approvalStatus !== "PENDING") {
    return (
      <span className="text-xs text-muted-foreground">
        Completed
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      <form
        action={async () => {
          "use server";
          await approveProperty(propertyId);
        }}
      >
        <button
          type="submit"
          className="
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            px-3
            py-2
            text-xs
            font-medium
            text-green-600
            transition
            hover:bg-green-500/20
          "
        >
          Approve
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await rejectProperty(propertyId);
        }}
      >
        <button
          type="submit"
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-3
            py-2
            text-xs
            font-medium
            text-red-600
            transition
            hover:bg-red-500/20
          "
        >
          Reject
        </button>
      </form>
    </div>
  );
}