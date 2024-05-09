CREATE MIGRATION m1dsd2fa3t5d4tcwvzeadtyqf3vi24skimmpxfjg5qkqeodi6etvva
    ONTO m1l42wqqujpsz5khfe24iczvl7zk675oj6jh5zqyqwn7od76fvjuua
{
  ALTER TYPE default::Player {
      CREATE PROPERTY image_url: std::str;
  };
};
