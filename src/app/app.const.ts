import { Toolbar } from 'ngx-editor';

export const TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h3', 'h4', 'h5', 'h6'] }],
];

export const SCROLL_LIMIT = 10;
