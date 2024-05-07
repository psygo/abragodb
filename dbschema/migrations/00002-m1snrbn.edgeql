CREATE MIGRATION m1snrbnn6cpkq3vq2kyfab7avkj2lrgyi62mpuza63r4brryj2lldq
    ONTO m1cjyswnkqbuvjtw2rznzezdvtwyjwsajm3wwde2ccemkkyah5fufq
{
  ALTER TYPE default::Profile {
      ALTER PROPERTY first_name {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY last_name {
          RESET OPTIONALITY;
      };
  };
};
