import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottiePlayerProps {
  src: string;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer = ({ src, width = 300, height = 300, loop = true, autoplay = true }: LottiePlayerProps) => {
  return (
    <div style={{ width, height }}>
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottiePlayer;
