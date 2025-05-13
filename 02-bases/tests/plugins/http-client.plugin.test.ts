import { test, expect, describe } from '@jest/globals';
import { httpClient } from "../../src/plugins/http-client.plugin";

describe('plugins/http-client.plugin', () => {
  test('httpClient.get() should return a string', async () => {
    const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');

    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: expect.any(Boolean)
    });
  });

  test('httpClientPlugin should have POST, PUT and Delete methods', () => {
    expect( typeof httpClient.post ).toBe('function');
    expect( typeof httpClient.delete ).toBe('function');
    expect( typeof httpClient.put ).toBe('function');
    expect( typeof httpClient.get ).toBe('function');
  });
});
