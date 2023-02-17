import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;

  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  opacity: 0.5;
  // div:first-child,
  // div:last-child {
  //   grid-column: span 2;
  // }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  border-radius: 100px;
  width: 50px;
  height: 50px;
  background: yellow;
  z-index: 999;
`;

const Button = styled(motion.button)`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const boxVariants = {
  hover: (direction: number) => ({
    originY: direction === 1 ? 1 : 0,
    originX: direction === 1 ? 1 : 0,
    scale: 1.1,
  }),
};

const buttonVariants = {
  changeBtn: (clicked: boolean) => ({
    scale: clicked ? 1.3 : 1,
    color: clicked ? 'rgba(255,105,46,1)' : 'rgba(0,140,255,1)',
    transition: {
      duration: 0.5,
    },
  }),
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [circle, setCircle] = useState(2);
  const [direction, setDirection] = useState(1);
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Wrapper>
        <Grid>
          {[1, 2, 3, 4].map((n) =>
            n === 1 || n === 4 ? (
              <Box
                custom={direction}
                variants={boxVariants}
                whileHover="hover"
                onMouseOver={() => setDirection(n)}
                onClick={() => setId(n + '')}
                key={n}
                layoutId={n + ''}
                transition={{ type: 'tween' }}
              />
            ) : (
              <Box key={n}>
                {circle === n ? <Circle layoutId="circleBox" /> : null}
              </Box>
            )
          )}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            >
              <Box layoutId={id} style={{ width: 400, height: 200 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
      <Button
        onClick={() => {
          setCircle((prev) => {
            const next = prev + 1;
            if (next === 4) return 2;
            return 3;
          });
          setClicked((prev) => !prev);
        }}
        variants={buttonVariants}
        custom={clicked}
        animate="changeBtn"
      >
        Switch
      </Button>
    </>
  );
}

export default App;
