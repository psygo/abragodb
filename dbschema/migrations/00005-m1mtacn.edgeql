CREATE MIGRATION m1mtacnspx7wl6bbwtpjder7lse54g5enzmavkxfjumppphuqmyqha
    ONTO m1h6ou2tnriq2bad5zhv7adgx2iifq6hxpgg5g4a7c2dzwejggthda
{
  ALTER TYPE default::Player {
      CREATE INDEX ON (.clerkid);
      CREATE INDEX ON (.created_at);
      CREATE INDEX ON (.username);
      CREATE INDEX ON (.nanoid);
      CREATE INDEX ON (.updated_at);
      CREATE INDEX ON (.email);
  };
  ALTER TYPE default::Profile {
      CREATE INDEX ON (.declared_elo);
      CREATE INDEX ON (.br_states_of_residence);
      CREATE INDEX ON (.is_public);
      CREATE INDEX ON (.cities_of_residence);
  };
};
