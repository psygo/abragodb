CREATE MIGRATION m1gboidpmsafrbj2dywuuu57il5lyfkl4gwydmt3fthzzh5zudihga
    ONTO m1kow52bap7uwk6ilzb3zaolc47phnbi4eg6ojg7kotgetd55ym6nq
{
  ALTER TYPE default::Profile {
      ALTER PROPERTY first_name {
          SET default := '';
      };
  };
};
