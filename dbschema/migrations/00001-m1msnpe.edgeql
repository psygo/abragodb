CREATE MIGRATION m1msnpeomp5exfnhoou4a6z7y3slnoeadrp3h74qa4vmuxsnyz7j3a
    ONTO initial
{
  CREATE SCALAR TYPE default::BrState EXTENDING enum<AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO>;
  CREATE TYPE default::Profile {
      CREATE PROPERTY br_states_of_origin: array<default::BrState>;
      CREATE PROPERTY br_states_of_residence: array<default::BrState>;
      CREATE PROPERTY cities_of_origin: array<std::str>;
      CREATE PROPERTY cities_of_residence: array<std::str>;
      CREATE PROPERTY countries_of_residence: array<std::str>;
      CREATE PROPERTY date_of_birth: cal::local_date;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY go_users: std::json;
      CREATE PROPERTY is_public: std::bool {
          SET default := false;
      };
      CREATE PROPERTY is_teacher: std::bool;
      CREATE PROPERTY languages: array<std::str>;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY nationalities: array<std::str>;
      CREATE PROPERTY public_email: std::str;
      CREATE PROPERTY socials_links: std::json;
  };
  CREATE TYPE default::GoUser {
      CREATE PROPERTY strength: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
  CREATE TYPE default::Player {
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
  ALTER TYPE default::Profile {
      CREATE REQUIRED LINK player: default::Player {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Player {
      CREATE LINK profile := (.<player[IS default::Profile]);
  };
  CREATE TYPE default::SocialLink {
      CREATE PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
};
