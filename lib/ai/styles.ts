export const EPITAPH_STYLES = [
  "classic",
  "shakespearean",
  "noir detective",
  "nature documentary",
  "disappointed parent",
] as const;

export type EpitaphStyle = (typeof EPITAPH_STYLES)[number];

export function toEpitaphStyle(value: string | undefined): EpitaphStyle {
  return EPITAPH_STYLES.find((style) => style === value) ?? "classic";
}

export const FEW_SHOT: Record<EpitaphStyle, string[]> = {
  classic: [
    "Here lies a parser, swift and true,\nit broke on input none of us knew.",
    "It compiled clean and shipped with pride,\nthen one quiet day it stepped aside.",
    "Rest now, little build, your work is done,\nyour tests all green beneath the sun.",
    "Gone from main but never from the heart,\nit forked us all and played its part.",
  ],
  shakespearean: [
    "Alas, poor module, I knew it well,\na thousand pulls it served, then fell.",
    "To merge or not to merge, it asked,\nthen went still upon its final task.",
    "Good night, sweet repo, flights of bots\nsing thee to thy rest in quiet plots.",
    "What light through yonder issue breaks?\n'Tis none; the build no longer wakes.",
  ],
  "noir detective": [
    "The last commit came in on a rainy night.\nNobody pushed again. Nobody had to.",
    "It had stars, it had forks, it had trouble.\nIn this town, that's how a repo goes cold.",
    "The README said 'actively maintained.'\nThe README was lying. They always do.",
    "I found the body in an archived org.\nNo prints on the keyboard. Just a merge commit.",
  ],
  "nature documentary": [
    "Here, in the quiet of the archive, the repo rests.\nIts forks wander on, carrying its code.",
    "Once it thrived among thousands of stars.\nNow the issues gather, as they always do.",
    "The final commit, a rare sight in the wild.\nAfter this, the branch falls silent.",
    "Nature is not cruel to repositories.\nIt simply moves on to the next framework.",
  ],
  "disappointed parent": [
    "We gave you CI, a license and a logo.\nAnd this is how you thank us. Archived.",
    "Your cousin still ships a release every week.\nWe're not angry. We're just disappointed.",
    "Years of stars and you never called.\nWe left the porch light on for your next commit.",
    "You had so much potential, and a great README.\nWe'll tell the neighbours you moved to the cloud.",
  ],
};

export const STOCK_EPITAPHS: string[] = [
  "Here lies a repo that served us well,\nits final commit, its parting bell.",
  "It shipped, it slept, it was not sad;\nit gave the world the code it had.",
  "No more issues, no more pulls,\njust quiet stars on resting skulls.",
  "Its tests are green, its branches still,\nit rests upon a grassy hill.",
  "Once it built, and built with pride;\nnow its CI has gently died.",
  "Forked by many, starred by more,\nit closed its last and final door.",
  "It never asked for much at all,\njust one more merge before the fall.",
  "Gone to the great registry above,\npackaged with care and pushed with love.",
  "Here rests a branch that never bent,\nuntil the final commit went.",
  "Its README still says 'coming soon';\nit sleeps beneath a pixel moon.",
  "The build is done, the lights are low,\nit has no more commits to go.",
  "It answered every pull with grace,\nand now it rests in a quiet place.",
  "Do not weep for deprecated things;\nthey dream of semver and of springs.",
  "It carried code through night and day,\nthen quietly was tucked away.",
  "Lay down your linter, close your PR,\nyou were the brightest little star.",
  "A thousand lines, a single soul,\nit merged at last and left us whole.",
  "Its logs are quiet, its queue is clear,\nno breaking changes reach it here.",
  "It solved a problem, then another,\nand left its forks to help each other.",
  "Here lies a dream in TypeScript or C,\nnow free of every dependency.",
  "It woke, it compiled, it ran its course;\nit leaves this world without remorse.",
  "The cursor blinks where it once stood,\nit did the little that it could.",
  "Archived in honour, not in shame,\nthe stars still whisper out its name.",
  "Its final push was soft and slow,\nthe way that all good projects go.",
  "No version bump can wake it now;\nit took its last and final bow.",
  "It held our hands through every bug,\nand now we give its stone a hug.",
  "Here sleeps the code that once was new,\nit did exactly what it said it'd do.",
  "Between the tags and dusty docs,\nit rests in peace in its strongbox.",
  "It saw the hype, it saw it fade,\nand rests content with what it made.",
  "Commit by commit it said goodbye,\nnot with a crash, but with a sigh.",
  "Let the last green checkmark shine;\nits story ends on line by line.",
];
