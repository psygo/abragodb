CREATE MIGRATION m1cjyswnkqbuvjtw2rznzezdvtwyjwsajm3wwde2ccemkkyah5fufq
    ONTO initial
{
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
  CREATE TYPE default::Profile {
      CREATE REQUIRED LINK player: default::Player;
      CREATE CONSTRAINT std::exclusive ON (.player);
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE REQUIRED PROPERTY last_name: std::str;
  };
  ALTER TYPE default::Player {
      CREATE LINK profile := (.<player[IS default::Profile]);
  };
  CREATE SCALAR TYPE default::BrState EXTENDING enum<AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO>;
};
