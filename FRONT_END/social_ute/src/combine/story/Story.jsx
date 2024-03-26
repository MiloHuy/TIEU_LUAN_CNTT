import Progress from "components/progress";
import { useEffect, useRef, useState } from "react";

const Story = () => {
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 100;
          }
          return prevProgress + 0.5;
        });
      }, 15);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <div className='w-[300px] h-[100px] flex justify-center items-center'>
      <Progress value={progress} className="w-3/4 rounded-none h-[10px]" />
    </div>
  );
}

export default Story
