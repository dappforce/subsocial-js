import mdToText from 'markdown-to-txt';
import truncate from 'lodash.truncate';

const DEFAULT_SUMMARY_LENGTH = 300;

/** Shorten a markdown text up to `limit` chars. Split by separators. */
export const summarize = (body: string, limit: number = DEFAULT_SUMMARY_LENGTH): string => {
  const text = mdToText(body);
  return text.length > limit
    ? truncate(text, {
      length: limit,
      separator: /.,:;!?\(\)\[\]\{\} +/
    })
    : text;
};
