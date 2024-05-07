CREATE MIGRATION m1ujlzu6dogcqvlrzi3xh7tiirgzuhwiv47uo4nou7fv4nwsy4a5ka
    ONTO m1snrbnn6cpkq3vq2kyfab7avkj2lrgyi62mpuza63r4brryj2lldq
{
  ALTER TYPE default::Profile {
      ALTER LINK player {
          CREATE CONSTRAINT std::exclusive;
      };
      DROP CONSTRAINT std::exclusive ON (.player);
  };
};
