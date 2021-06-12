/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

export enum OptionType {
  BOOLEAN,
  INT,
  STRING
}

/**
 * This array stores all options for
 */
export const OPTIONS_DATA = [
  [ // Open text question
    {name: 'Option 1', type: OptionType.BOOLEAN, value: true, visibleAtCreation: true},
    {name: 'Option 2', type: OptionType.INT, value: 0, visibleAtCreation: false},
    {name: 'Option 3', type: OptionType.INT, value: 0, visibleAtCreation: true}
  ],
  [ // Multiple choice question
    {name: 'User can select multiple answers', type: OptionType.BOOLEAN, value: false, visibleAtCreation: true},
    {name: 'User can bring up a input field for custom answers', type: OptionType.BOOLEAN, value: false, visibleAtCreation: true}
  ],
  [ // Quiz question

  ],
  [ // Word cloud question

  ],
  [ // Rating question
    {name: 'Stars min', type: OptionType.INT, value: 0, min: 0, max: 10, visibleAtCreation: true},
    {name: 'Stars max', type: OptionType.INT, value: 5, min: 0, max: 10, visibleAtCreation: true}
  ],
];
