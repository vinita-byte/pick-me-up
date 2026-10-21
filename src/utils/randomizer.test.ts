import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterDialogues,
  pickRandomDialogue,
  resolveSoundForDialogue,
  formatDialogueForSharing,
} from './randomizer';
import { BOLLYWOOD_DIALOGUES, VIBE_CATEGORIES } from '../data/dialogues';
import { SOUND_EFFECTS } from '../data/sounds';
import { Dialogue } from '../types/dialogue';

test('dataset contains all required dialogues and expected categories', () => {
  assert.ok(BOLLYWOOD_DIALOGUES.length >= 50, 'Must have at least 50 dialogues');
  assert.equal(VIBE_CATEGORIES.length, 7, 'Expected 7 vibe categories including all');

  // Verify each dialogue has valid quote, movie, vibe, and scenario
  for (const d of BOLLYWOOD_DIALOGUES) {
    assert.ok(d.id.length > 0, `Dialogue ${d.id} has empty id`);
    assert.ok(d.quote.length > 0, `Dialogue ${d.id} has empty quote`);
    assert.ok(d.movie.length > 0, `Dialogue ${d.id} has empty movie`);
    assert.ok(d.scenario.length > 0, `Dialogue ${d.id} has empty scenario`);
  }
});

test('sound effects list contains all 9 user audio assets', () => {
  assert.equal(SOUND_EFFECTS.length, 9, 'Must register exactly 9 user sound effects');
  const soundIds = SOUND_EFFECTS.map((s) => s.id);
  assert.ok(soundIds.includes('romance'));
  assert.ok(soundIds.includes('patola'));
  assert.ok(soundIds.includes('indian-dhol'));
  assert.ok(soundIds.includes('abhi-maza'));
  assert.ok(soundIds.includes('khopdi-tod'));
  assert.ok(soundIds.includes('kuch-gadbad'));
  assert.ok(soundIds.includes('cartoon-laugh'));
  assert.ok(soundIds.includes('duck-toy'));
  assert.ok(soundIds.includes('mac-quack'));
});

test('filterDialogues filters by vibe category correctly', () => {
  const romantic = filterDialogues(BOLLYWOOD_DIALOGUES, 'iconic-romance');
  assert.ok(romantic.length > 0);
  assert.ok(romantic.every((d) => d.vibe === 'iconic-romance'));

  const banter = filterDialogues(BOLLYWOOD_DIALOGUES, 'comedic-banter');
  assert.ok(banter.length > 0);
  assert.ok(banter.every((d) => d.vibe === 'comedic-banter'));
});

test('filterDialogues searches by keyword across quotes and movies', () => {
  const ddljResults = filterDialogues(BOLLYWOOD_DIALOGUES, 'all', 'DDLJ');
  assert.ok(ddljResults.length > 0);

  const pastaResults = filterDialogues(BOLLYWOOD_DIALOGUES, 'all', 'pasta');
  assert.ok(pastaResults.length >= 1);
  assert.ok(pastaResults[0].quote.toLowerCase().includes('pasta'));
});

test('pickRandomDialogue avoids selecting the currently displayed dialogue when possible', () => {
  const dummyList: Dialogue[] = [
    {
      id: 'd1',
      quote: 'Quote 1',
      movie: 'Movie 1',
      vibe: 'iconic-romance',
      vibeLabel: 'Romance',
      scenario: 'Test 1',
      tags: [],
    },
    {
      id: 'd2',
      quote: 'Quote 2',
      movie: 'Movie 2',
      vibe: 'iconic-romance',
      vibeLabel: 'Romance',
      scenario: 'Test 2',
      tags: [],
    },
  ];

  const picked = pickRandomDialogue(dummyList, 'd1');
  assert.equal(picked?.id, 'd2');
});

test('resolveSoundForDialogue respects soundMode settings', () => {
  const testDialogue: Dialogue = {
    id: 'test',
    quote: 'Test quote',
    movie: 'Test movie',
    vibe: 'iconic-romance',
    vibeLabel: 'Romance',
    scenario: 'Scenario',
    suggestedSoundId: 'romance',
    tags: [],
  };

  assert.equal(resolveSoundForDialogue(testDialogue, 'silent'), '');
  assert.equal(resolveSoundForDialogue(testDialogue, 'smart-match'), 'romance');
  assert.equal(
    resolveSoundForDialogue(testDialogue, 'specific', 'khopdi-tod'),
    'khopdi-tod'
  );
});

test('formatDialogueForSharing returns clean text with quote and attribution', () => {
  const testDialogue: Dialogue = {
    id: 'test',
    quote: 'Pyaar dosti hai.',
    movie: 'Kuch Kuch Hota Hai',
    year: '1998',
    vibe: 'iconic-romance',
    vibeLabel: 'Romance',
    scenario: 'When friendship blossoms into love',
    tags: [],
  };

  const formatted = formatDialogueForSharing(testDialogue);
  assert.ok(formatted.includes('Pyaar dosti hai.'));
  assert.ok(formatted.includes('Kuch Kuch Hota Hai'));
  assert.ok(formatted.includes('Pick Me Up'));
});
