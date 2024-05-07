module default {
  scalar type BrState 
    extending enum<
      AC,
      AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO
    >;
  

  type Player {
    required username: str {
      constraint exclusive;
    }
    required email: str {
      constraint exclusive;
    }
    required nanoid: str {
      constraint exclusive;
    }
    created_at: datetime {
      default := (select datetime_current());
    }
    updated_at: datetime {
      default := (select datetime_current());
    }

    profile: Profile {
      constraint exclusive;
    }
  }
  
  type Profile {
    first_name: str;
    last_name: str;
    date_of_birth: str;

    description: str;

    languages: array<str>;

    nationalities: array<str>;
    br_states_of_origin: array<BrState>;
    cities_of_origin: array<str>;

    countries_of_residence: array<str>;
    br_states_of_residence: array<BrState>;
    cities_of_residence: array<str>;

    socials_links: json;

    is_teacher: bool;
  }
}
