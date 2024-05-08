CREATE MIGRATION m1cmguzs4b6sq5vxrbncnfclm7q7yo5nfepm7pusxd6azqqdst7oeq
    ONTO m1gboidpmsafrbj2dywuuu57il5lyfkl4gwydmt3fthzzh5zudihga
{
  ALTER TYPE default::Profile {
      ALTER PROPERTY date_of_birth {
          SET TYPE cal::local_date USING (<cal::local_date>.date_of_birth);
      };
      ALTER PROPERTY first_name {
          RESET default;
      };
  };
};
