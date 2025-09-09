'use client';
import clsx from 'clsx';
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

const Game = () => {
  const showStats = useStatsStore(state => state.showStats);

  const resetStats = useStatsStore(state => state.resetStats);

  const gameMode = useKanaKanjiStore(state => state.selectedGameModeKana);

  useEffect(() => {
    resetStats();
  }, [resetStats]);

  return (
    <div
      className={clsx(
        'flex flex-col gap-6 md:gap-10 items-center min-h-[100dvh] max-w-[100dvw] px-4',
        // "bg-[url('/wallpapers/neonretrocarcity.jpg')] bg-cover bg-center"
        // "bg-[url('/wallpapers/kanaDojoWallpaper.png')] bg-cover bg-center backdrop-blur-lg"
      )}
    >
      <Suspense fallback={<div className="animate-pulse w-full h-20 bg-gray-200 rounded" />}>
        {showStats && <Stats />}
      </Suspense>
      <Return isHidden={showStats} href='/kana' />
      <Suspense fallback={<div className="animate-pulse w-full h-96 bg-gray-200 rounded" />}>
        {gameMode.toLowerCase() === 'pick' ? (
          <Pick isHidden={showStats} />
        ) : gameMode.toLowerCase() === 'reverse-pick' ? (
          <ReversePick isHidden={showStats} />
        ) : gameMode.toLowerCase() === 'input' ? (
          <Input isHidden={showStats} />
        ) : gameMode.toLowerCase() === 'reverse-input' ? (
          <ReverseInput isHidden={showStats} />
        ) : null}
      </Suspense>
    </div>
  );
};

export default Game;
