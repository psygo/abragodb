CREATE MIGRATION m1kow52bap7uwk6ilzb3zaolc47phnbi4eg6ojg7kotgetd55ym6nq
    ONTO m1ujlzu6dogcqvlrzi3xh7tiirgzuhwiv47uo4nou7fv4nwsy4a5ka
{
  ALTER TYPE default::Profile {
      CREATE PROPERTY br_states_of_origin: array<default::BrState>;
      CREATE PROPERTY br_states_of_residence: array<default::BrState>;
      CREATE PROPERTY cities_of_origin: array<std::str>;
      CREATE PROPERTY cities_of_residence: array<std::str>;
      CREATE PROPERTY countries_of_residence: array<std::str>;
      CREATE PROPERTY date_of_birth: std::str;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY is_public: std::bool {
          SET default := false;
      };
      CREATE PROPERTY is_teacher: std::bool;
      CREATE PROPERTY languages: array<std::str>;
      CREATE PROPERTY nationalities: array<std::str>;
      CREATE PROPERTY public_email: std::str;
      CREATE PROPERTY socials_links: std::json;
  };
};
