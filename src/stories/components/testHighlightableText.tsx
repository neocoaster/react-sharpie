import React, { useState } from 'react';

import HighlatableText, { HandleOverlap } from '../../components/highlatableText';
import Highlight from '../../interfaces/highlight';

export interface TestHighlatableTextProps {
  id:string,
  text: string,
  highlights: Highlight[],
  style: React.CSSProperties,
  highlightOptions: string[],
  highlightable: boolean,
  handleOverlaps: HandleOverlap,
}

const TestHighlightableText = ({
  id,
  text,
  highlights,
  style,
  highlightOptions,
  highlightable,
  handleOverlaps,
}:TestHighlatableTextProps) => {
  const [internalHighlights, setHighlights] = useState<Highlight[]>(highlights);

  return (
    <HighlatableText
      id={id}
      text={text}
      highlights={internalHighlights}
      setHighlights={setHighlights}
      style={style}
      highlightOptions={highlightOptions}
      highlightable={highlightable}
      handleOverlaps={handleOverlaps}
    />
  );
};

export default TestHighlightableText;
