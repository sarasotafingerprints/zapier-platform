'use strict';

const makeSchema = require('../utils/makeSchema');

module.exports = makeSchema({
  id: '/ThrottleObjectSchema',
  description:
    'Zapier uses this configuration to throttle an action\'s perform method when its number of invocations exceeds the limit within a specific window.',
  type: 'object',
  required: ['window', 'limit'],
  properties: {
    window: {
      description:
        'The timeframe in seconds to track the number of invocations to an action\'s perform method before resetting, to start all over again.',
      type: 'integer',
    },
    limit: {
      description:
        'The maximum number of invocations to an action\'s perform method, allowed within the timeframe window.',
      type: 'integer',
    },
    scope: {
      description: `The requester's attribute with which the invocations would be throttled by. You can set the scope to one or more of the following: 'user' - Throttles based on user ids.  'auth' - Throttles based on auth ids. 'account' - Throttles based on account ids for all users under a single account. By default, throttling is scoped to the account.`,
      type: 'array',
      items: {
        enum: ['user', 'auth', 'account'],
        type: 'string',
      },
    },
  },
  examples: [
    {
      window: 60,
      limit: 100,
    },
    {
      window: 600,
      limit: 100,
      scope: ['account', 'user'],
    },
    {
      window: 3600,
      limit: 10,
      scope: ['auth'],
    },
  ],
  antiExamples: [
    {
      example: {
        window: 60,
        limit: 100,
        scope: ['zap'],
      },
      reason: 'Invalid scope provided: `zap`.',
    },
    {
      example: {limit: 10},
      reason: 'Missing required key: `window`.',
    },
    {
      example: {window: 600},
      reason: 'Missing required key: `limit`.',
    },
    {
      example: {},
      reason: 'Missing required keys: `window` and `limit`.',
    },
  ],
  additionalProperties: false,
});
