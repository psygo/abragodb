module default {
  type Player {
    required clerkid: str {
      constraint exclusive;
    }
    required nanoid: str {
      constraint exclusive;
    }

    required username: str {
      constraint exclusive;
    }
    required email: str {
      constraint exclusive;
    }

    created_at: datetime {
      default := (select datetime_current());
    }
    updated_at: datetime {
      default := (select datetime_current());
    }

    profile := .<player[is Profile];
  }
  
  type Profile {
    required player: Player {
      constraint exclusive;
    };

    is_public: bool {
      default := false;
    }

    first_name: str;
    last_name: str;
    public_email: str;
    date_of_birth: cal::local_date;

    description: str;

    languages: array<str>;

    nationalities: array<str>;
    br_states_of_origin: array<BrState>;
    cities_of_origin: array<str>;

    countries_of_residence: array<str>;
    br_states_of_residence: array<BrState>;
    cities_of_residence: array<str>;

    socials_links: array<str>;
    
    go_users: json;

    is_teacher: bool;
  }
  
  type SocialLink {
    name: str;
    required url: str;
  }
  
  type GoUser {
    required username: str;
    strength: str;
  }

  scalar type BrState 
    extending enum<
      AC,
      AL,
      AP,
      AM,
      BA,
      CE,
      DF,
      ES,
      GO,
      MA,
      MT,
      MS,
      MG,
      PA,
      PB,
      PR,
      PE,
      PI,
      RJ,
      RN,
      RS,
      RO,
      RR,
      SC,
      SP,
      SE,
      TO
    >;
}
