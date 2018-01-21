import TextFormatting from './../../utilities/TextFormatting';

it('TextFormatting: sentenceCase transforms text', () => {
  let input = "how is the now"
  let output = "How Is The Now"
  expect(TextFormatting.sentenceCase(input)).toBe(output)
})