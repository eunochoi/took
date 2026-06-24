'use client';

import { ErrorPage } from '@/common/components/ui/ErrorPage';
import { ERROR_PAGE_PRESETS } from '@/common/components/ui/ErrorPage/presets';
import { useOnlineStatus } from '@/common/hooks/useOnlineStatus';

const OfflineScreen = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000000]">
      <ErrorPage
        title={ERROR_PAGE_PRESETS.offline.title}
        description={ERROR_PAGE_PRESETS.offline.description}
        buttons={[]}
      />
    </div>
  );
};

export default OfflineScreen;
