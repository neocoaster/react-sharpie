import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestHighlightableText from './components/testHighlightableText';
import { HandleOverlap } from '../components/highlatableText';

export default {
  title: 'Highlatable Text Story',
  component: TestHighlightableText,
  argTypes: {
    id: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    highlights: {
      control: { type: 'object' },
    },
    setHighlights: {
      table: {
        disable: true,
      },
    },
    style: {
      control: { type: 'object' },
    },
    highlightOptions: {
      control: { type: 'object' },
    },
    highlightable: {
      control: { type: 'boolean' },
    },
    handleOverlaps: {
      description: 'Determines the shape of the button',
      options: [HandleOverlap.Merge, HandleOverlap.Delete],
      mapping: [HandleOverlap.Merge, HandleOverlap.Delete],
      control: {
        type: 'inline-radio',
        labels: ['Merge', 'Delete'],
      },
    },
  },
} as ComponentMeta<typeof TestHighlightableText>;

const Template:
ComponentStory<typeof TestHighlightableText> =  (args) => <TestHighlightableText {...args} />;

export const HighlatableTextStory = Template.bind({});

HighlatableTextStory.args = {
  id: 'test',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  highlights: [
    {
      start: 0,
      end: 10,
      selection: 'Lorem ipsum',
      style: 'background: yellow; color: red;',
    },
  ],
  style: {},
  highlightOptions: [],
  highlightable: true,
  handleOverlaps: HandleOverlap.Merge,
};
