interface IOk {
  statusCode: 200;
  headers: {
    'Content-Type': 'application/json';
  };
  body: string;
}

export const ok = <T extends {}>(body: T): IOk => ({
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: 200,
});
