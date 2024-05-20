CREATE MIGRATION m1jsmzlq3mclaletgns7otddlrm3arkr3i76qpohygqzn4vycs6nqa
    ONTO m1mnfotxluvpe7ufey2eu3xsaqfw4soscq5r2zjjqw7b5vtdw2p3uq
{
  ALTER TYPE default::Profile {
      ALTER PROPERTY is_public {
          SET default := true;
      };
  };
};
