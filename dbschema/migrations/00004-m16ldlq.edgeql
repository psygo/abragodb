CREATE MIGRATION m16ldlqqnjc4vbfojjt27z4q5lp5zcckwwfgck2zgs5o67blrmzagq
    ONTO m1dsd2fa3t5d4tcwvzeadtyqf3vi24skimmpxfjg5qkqeodi6etvva
{
  ALTER TYPE default::Profile {
      CREATE PROPERTY created_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
  };
};
