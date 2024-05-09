CREATE MIGRATION m1l42wqqujpsz5khfe24iczvl7zk675oj6jh5zqyqwn7od76fvjuua
    ONTO m1msnpeomp5exfnhoou4a6z7y3slnoeadrp3h74qa4vmuxsnyz7j3a
{
  ALTER TYPE default::Profile {
      CREATE PROPERTY sex: std::str;
  };
};
