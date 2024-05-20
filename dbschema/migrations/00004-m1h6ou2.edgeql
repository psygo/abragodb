CREATE MIGRATION m1h6ou2tnriq2bad5zhv7adgx2iifq6hxpgg5g4a7c2dzwejggthda
    ONTO m1jsmzlq3mclaletgns7otddlrm3arkr3i76qpohygqzn4vycs6nqa
{
  ALTER TYPE default::Profile {
      CREATE PROPERTY declared_elo: std::int16;
  };
};
