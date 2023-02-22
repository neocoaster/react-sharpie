import React, { useEffect } from 'react';

import Highlight from '../interfaces/highlight';
import styleToString from '../helpers/styleToString';

import '../assets/styles/highlightableText.scss';

export enum HandleOverlap {
  Merge,
  Delete,
  Error,
}

export interface HighlatableTextProps {
  id: string,
  text: string,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  style: React.CSSProperties,
  highlightOptions: React.CSSProperties[],
  highlightable: boolean,
  handleOverlaps: HandleOverlap,
  errors?: string[],
  setErrors?: (val: string[]) => void,
}

const HighlatableText = ({
  id,
  text,
  highlights,
  setHighlights,
  style,
  highlightOptions,
  handleOverlaps,
  highlightable,
  errors,
  setErrors,
}: HighlatableTextProps) => {
  const drawHighlight = (
    start:number,
    end:number,
    highlightStyle: string,
    lenghtDifference: number,
  ) => {
    const element = document.getElementById(id);
    if (element) {
      const str = element.innerHTML;
      const modStart = start + lenghtDifference;
      const modEnd = end + lenghtDifference;
      const modstr = `${str.substr(0, modStart)
      }<span style="${highlightStyle}">${
        str.substr(modStart, modEnd - modStart + 1)
      }</span>${
        str.substr(modEnd + 1)}`;
      element.innerHTML = modstr;
      return modstr.length - str.length;
    }
    return 0;
  };

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      let lenghtDifference = 0;
      element.innerHTML = text;
      highlights.sort((prev, next) => prev.start - next.start).forEach(
        (highlight) => {
          lenghtDifference += drawHighlight(
            highlight.start,
            highlight.end,
            highlight.style,
            lenghtDifference,
          );
        },
      );
    }
  }, [highlights]);

  const overlapingHighlight = (highlight: Highlight) => highlights.filter(
    (curr) => highlight.start <= curr.end && highlight.end >= curr.start,
  );

  const nonOverlapingHighlight = (highlight: Highlight) => highlights.filter(
    (curr) => !(highlight.start <= curr.end && highlight.end >= curr.start),
  );

  const mergeHighlights = (overlaps: Highlight[]) => {
    const starts = overlaps.map((overlap) => overlap.start);
    const ends = overlaps.map((overlap) => overlap.end);
    const newhighlight:Highlight = {
      start: Math.min(...starts),
      end: Math.max(...ends),
      selection: text.substring(Math.min(...starts), Math.max(...ends)),
      style: 'background: yellow;',
    };
    
    setHighlights([...nonOverlapingHighlight(newhighlight), newhighlight]);
  };

  const overlapHandler = (newhighlight: Highlight, overlaps: Highlight[]) => {
    switch (handleOverlaps) {
      case HandleOverlap.Merge:
        mergeHighlights([...overlaps, newhighlight]);
        break;
      case HandleOverlap.Delete:
        setHighlights(nonOverlapingHighlight(newhighlight));
        break;
      case HandleOverlap.Error:
        if (errors && setErrors) {
          setErrors([...errors, 'Highlights overlap']);
        }
        break;
      default:
        alert('Highlights overlap');
    }
  };

  const mouseOverHandle = () => {
    const selection = window.getSelection();
    if (selection) {
      const fst = selection.anchorOffset;
      const snd = selection.focusOffset;
      if (highlightable && fst >= 0 && snd >= 0) {
        const start = Math.min(fst, snd);
        const end = Math.max(fst, snd) - 1;
        const newhighlight:Highlight = {
          start,
          end,
          selection: selection.toString(),
          style: 'background: yellow;',
        };
        const overlap = overlapingHighlight(newhighlight);
        
        if (overlap.length > 0) {
          overlapHandler(newhighlight, overlap);
        } else {
          setHighlights([...highlights, newhighlight]);
        }
      }
    }
  };

  return (
    <div style={style}>
      <div id={id} className="highlitable-text__overlay">
        {text}
      </div>
      <div
        className="highlitable-text"
        style={{ position: 'absolute' }}
        role="presentation"
        onMouseUp={mouseOverHandle}
      >
        {text}
      </div>
    </div>
  );
};

export default HighlatableText;
