CREATE MIGRATION m1ymqtcnjflnhm5xgmdjzhdtu6ue4pon56ycczguex3cfsxrunnq7q
    ONTO initial
{
  CREATE SCALAR TYPE default::BrState EXTENDING enum<AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO>;
  CREATE TYPE default::Profile {
      CREATE PROPERTY br_states_of_origin: array<default::BrState>;
      CREATE PROPERTY br_states_of_residence: array<default::BrState>;
      CREATE PROPERTY cities_of_origin: array<std::str>;
      CREATE PROPERTY cities_of_residence: array<std::str>;
      CREATE PROPERTY countries_of_residence: array<std::str>;
      CREATE PROPERTY date_of_birth: std::str;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY is_teacher: std::bool;
      CREATE PROPERTY languages: array<std::str>;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY nationalities: array<std::str>;
      CREATE PROPERTY socials_links: std::json;
  };
  CREATE TYPE default::Player {
      CREATE LINK profile: default::Profile {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY clerkid: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY created_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY nanoid: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
