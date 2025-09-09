'use client';
import { useEffect, lazy, Suspense } from 'react';
import Return from '@/components/reusable/Game/ReturnFromGame';
import useKanaKanjiStore from '@/store/useKanaKanjiStore';
import useStatsStore from '@/store/useStatsStore';

// Dynamic imports for better performance
const Pick = lazy(() => import('./Pick'));
const ReversePick = lazy(() => import('./ReversePick'));
const Input = lazy(() => import('./Input'));
const ReverseInput = lazy(() => import('./ReverseInput'));
const Stats = lazy(() => import('@/components/reusable/Game/Stats'));
import { usePathname } from 'next/navigation';

const Game = () => {
  const pathname = usePathname().split('/').slice(0, -2).join('/');

  const showStats = useStatsStore(state => state.showStats);

  const resetStats = useStatsStore(state => state.resetStats);

  const gameMode = useKanaKanjiStore(state => state.selectedGameModeKanji);
  const selectedKanjiObjs = useKanaKanjiStore(state => state.selectedKanjiObjs);

  useEffect(() => {
    resetStats();
  }, [resetStats]);

  return (
    <div className="flex flex-col gap-6 md:gap-10 items-center min-h-[100dvh] max-w-[100dvw] px-4 ">
      <Suspense fallback={<div className="animate-pulse w-full h-20 bg-gray-200 rounded" />}>
        {showStats && <Stats />}
      </Suspense>
      <Return
        isHidden={showStats}
        href={pathname}
      />
      <Suspense fallback={<div className="animate-pulse w-full h-96 bg-gray-200 rounded" />}>
        {gameMode.toLowerCase() === 'pick' ? (
          <Pick
            selectedKanjiObjs={selectedKanjiObjs}
            isHidden={showStats}
          />
        ) : gameMode.toLowerCase() === 'reverse-pick' ? (
          <ReversePick
            selectedKanjiObjs={selectedKanjiObjs}
            isHidden={showStats}
          />
        ) : gameMode.toLowerCase() === 'input' ? (
          <Input
            selectedKanjiObjs={selectedKanjiObjs}
            isHidden={showStats}
          />
        ) : gameMode.toLowerCase() === 'reverse-input' ? (
          <ReverseInput
            selectedKanjiObjs={selectedKanjiObjs}
            isHidden={showStats}
          />
        ) : null}
      </Suspense>
    </div>
  );
};

export default Game;
