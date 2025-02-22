import { test, expect, describe } from '@jest/globals';
import { getId } from "../../src/plugins";

describe('plugins/get-id.plugin', () => {
  test('getId() should return a UUID', () => {
    const uuid = getId();

    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
  });
});
